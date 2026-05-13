/**
 * main.js - Lógica de negócio para a interface de Produtos.
 * Consome os endpoints da API Spring Boot.
 */

// URL base da API - Ajustada para a porta padrão do Spring Boot
const URL_PRODUTOS = "http://localhost:8081/appVendas/produtos";
const URL_UNIDADEMEDIDAS = "http://localhost:8081/appVendas/unidademedidas";
$(document).ready(function () {
    listarProdutos();
    getUnidadeMedidas();
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
                    <th>Unidade de Medida</th>
                    <th class="center">Ações</th>
                </tr>
            </thead>
            <tbody>`;

    lista.forEach(prod => {
        const descUnidade = prod.unidadeMedida ? prod.unidadeMedida.sigla: "";
        html += `
            <tr>
                <td>${prod.nome}</td>
                <td>R$ ${prod.precoVenda.toFixed(2)}</td>
                <td>${prod.estoque}</td>
                <td>${prod.estoqueMinimo}</td>
                <td>${descUnidade}</td>
            
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
 * Busca as UMs do servidor e preenche o Select
 */
function getUnidadeMedidas() {
    $.get(URL_UNIDADEMEDIDAS, function (lista) {
        let select = $('#unidadeMedida');
        select.empty(); // Limpa as opções atuais
        select.append('<option value="" disabled selected>Selecione uma opção</option>');

        lista.forEach(und => {
            // Usamos und.id no value e und.sigla/descricao no texto
            select.append(`<option value="${und.id}">${und.sigla} - ${und.descricao}</option>`);
        });

        // Re-inicializa o componente select do Materialize
        // Sem isso, as novas opções não aparecerão na tela!
        $('select').formSelect();
    })
        .fail(function() {
            exibirMensagem("Erro ao carregar unidades de medida.");
        });
}





/**
 * Envia os dados do formulário (Salvar ou Atualizar).
 */
function salvar() {
    const id = $("#id").val();
    const unidadeId = $("#unidadeMedida").val();

    // Coleta dados sincronizados com ProdutoDTO.java
    const dados = {
        id: id ? parseInt(id) : null,
        nome: $("#nome").val(),
        precoCusto: parseFloat($("#precoCusto").val()) || 0,
        precoVenda: parseFloat($("#precoVenda").val()) || 0,
        estoque: parseInt($("#estoque").val()) || 0,
        estoqueMinimo: parseInt($("#estoqueMinimo").val()) || 0,
        unidadeMedida: {id: parseInt(unidadeId)}
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
        // Define o valor no select (assumindo que o JSON traz prod.unidadeMedida.id)
        if (prod.unidadeMedida && prod.unidadeMedida.id) {
            $("#unidadeMedida").val(prod.unidadeMedida.id);
        }
        // CORREÇÃO CRÍTICA: Faz as labels subirem para não sobrepor o texto
        M.updateTextFields();
        $('select').formSelect();

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

   function executarExclusao(id) {
       exibirCarregando();
       $.ajax({
           url: `${URL_PRODUTOS}/${id}`,
           type: 'DELETE',
           success: function() {
               exibirMensagem("Produto removido com sucesso!");

               // LIMPEZA: Se o produto excluído era o que estava sendo editado, limpamos o form
               if ($("#id").val() == id) {
                   limparFormulario();
               }

               listarProdutos();
           },
           error: function(xhr) {
               exibirMensagem("Erro ao excluir: " + (xhr.responseText || "Tente novamente."));
           },
           complete: ocultarCarregando
       });
   }
   /*
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
           // Força o select a voltar para a opção "Selecione..."
           $("#unidadeMedida").val();
           $('select').formSelect();
           M.updateTextFields();
       }
   }