/**
 * main.js - Lógica de negócio para a interface de Produtos.
 * Consome os endpoints da API Spring Boot.
 */

// URL base da API - Ajustada para a porta padrão do Spring Boot
const URL_PRODUTOS = "http://localhost:8081/appVendas/produtos";
$(document).ready(function () {
    listarProdutos();
});

/**
 * Busca a lista de produtos do servidor.
 */
function listarProdutos() {
    exibirCarregando();
    $.get(URL_PRODUTOS, function (json) {
        $("#listaProdutos").html(gerarTabelaProdutos(json));
    })
    .fail(function(xhr) {
        exibirMensagem("Erro ao carregar produtos.");
    })
    .always(function() {
        ocultarCarregando();
    });
}

/**
 * Renderiza a tabela de produtos.
 */
function gerarTabelaProdutos(lista) {
    if (!lista || lista.length === 0) {
        return '<p class="center">Nenhum produto cadastrado.</p>';
    }

    let html = `
        <table class="highlight responsive-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Preço Venda</th>
                    <th>Estoque</th>
                    <th>Mínimo</th>
                    <th class="center">Ações</th>
                </tr>
            </thead>
            <tbody>`;

    lista.forEach(prod => {
        html += `
            <tr>
                <td>${prod.nome}</td>
                <td>R$ ${prod.precoVenda.toFixed(2)}</td>
                <td>${prod.estoque}</td>
                <td>${prod.estoqueMinimo}</td>
                <td class="center">
                    <a class="btn-flat waves-effect" onclick="prepararEdicao(${prod.id})">
                        <i class="material-icons blue-text">edit</i>
                    </a>
                    <a class="btn-flat waves-effect" onclick="excluirProduto(${prod.id})">
                        <i class="material-icons red-text">delete</i>
                    </a>
                </td>
            </tr>`;
    });

    html += `</tbody></table>`;
    return html;
}

/**
 * Envia os dados do formulário (Salvar ou Atualizar).
 */
function salvar() {
    const id = $("#id").val();

    // Coleta dados sincronizados com ProdutoDTO.java
    const dados = {
        nome: $("#nome").val(),
        precoCusto: parseFloat($("#precoCusto").val()) || 0,
        precoVenda: parseFloat($("#precoVenda").val()) || 0,
        estoque: parseInt($("#estoque").val()) || 0,
        estoqueMinimo: parseInt($("#estoqueMinimo").val()) || 0
    };

    if (!dados.nome) {
        exibirMensagem("O nome é obrigatório!");
        return;
    }

    const metodo = id ? "PUT" : "POST";
    const urlFinal = id ? `${URL_PRODUTOS}/${id}` : URL_PRODUTOS;

    // Função enviarDados agora utiliza Toasts do app.js
    enviarDados(urlFinal, dados, function () {
        exibirMensagem("Produto processado com sucesso!");
        limparFormulario();
        listarProdutos();
    }, metodo);
}

/**
 * Carrega os dados de um produto para edição.
 */
function prepararEdicao(id) {
    exibirCarregando();
    $.get(`${URL_PRODUTOS}/${id}`, function (prod) {
        $("#id").val(prod.id);
        $("#nome").val(prod.nome);
        $("#precoCusto").val(prod.precoCusto.toFixed(2));
        $("#precoVenda").val(prod.precoVenda.toFixed(2));
        $("#estoque").val(prod.estoque);
        $("#estoqueMinimo").val(prod.estoqueMinimo);

        // CORREÇÃO CRÍTICA: Faz as labels subirem para não sobrepor o texto
        M.updateTextFields();

        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .fail(function() {
        exibirMensagem("Erro ao buscar dados do produto.");
    })
    .always(ocultarCarregando);
}

/**
 * Exclui um produto.
 */function excluirProduto(id) {
       // 1. Instancia o modal do Materialize
       const elem = document.getElementById('modalConfirmacao');
       const instance = M.Modal.getInstance(elem) || M.Modal.init(elem);

       // 2. Configura o clique do botão "Excluir" do modal para o ID específico
       $("#btnConfirmarExclusao").off('click').on('click', function() {
           executarExclusao(id);
       });

       // 3. Abre a janela
       instance.open();
   }

   /**
    * Realiza a chamada técnica de exclusão após a confirmação no modal.
    */
   /**
    * Reseta o formulário e as etiquetas (labels) do Materialize.
    */
   function limparFormulario() {
       // 1. Reseta os valores dos inputs
       $("#frmProduto")[0].reset();

       // 2. Limpa o ID oculto (essencial para não confundir POST com PUT)
       $("#id").val("");

       // 3. CORREÇÃO VISUAL: Força o Materialize a resetar as labels
       // Isso evita que a label fique "suspensa" em um campo vazio
       if (typeof M !== "undefined") {
           M.updateTextFields();
       }
   }