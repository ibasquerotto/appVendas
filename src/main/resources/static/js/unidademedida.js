/**
 * main.js - Lógica de negócio para a interface de Produtos.
 * Consome os endpoints da API Spring Boot.
 */

// URL base da API - Ajustada para a porta padrão do Spring Boot
const URL_UNIDADEMEDIDAS = "http://localhost:8081/appVendas/unidademedidas";
$(document).ready(function () {
    listarUnidadeMedidas();
});

/**
 * Busca a lista de produtos do servidor.
 */
function listarUnidadeMedidas() {
    exibirCarregando();
    $.get(URL_UNIDADEMEDIDAS, function (json) {
        $("#listaUnidadeMedidas").html(gerarTabelaUnidadeMedidas(json));
    })
        .fail(function(xhr) {
            exibirMensagem("Erro ao carregar um.");
        })
        .always(function() {
            ocultarCarregando();
        });
}

/**
 * Renderiza a tabela de um.
 */
function gerarTabelaUnidadeMedidas(lista) {
    if (!lista || lista.length === 0) {
        return '<p class="center">Nenhuma um cadastrada.</p>';
    }

    let html = `
        <table class="highlight responsive-table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Sigla</th>
                    <th class="center">Ações</th>
                </tr>
            </thead>
            <tbody>`;

    lista.forEach(und => {
        html += `
            <tr>
                <td>${und.descricao}</td>
                <td>${und.sigla}</td>
                <td class="center">
                    <a class="btn-flat waves-effect" onclick="prepararEdicao(${und.id})">
                        <i class="material-icons blue-text">edit</i>
                    </a>
                    <a class="btn-flat waves-effect" onclick="excluirProduto(${und.id})">
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
        descricao: $("#descricao").val(),
        sigla: $("#sigla").val() || 0
    };

    if (!dados.descricao) {
        exibirMensagem("A descrição é obrigatória!");
        return;
    }

    const metodo = id ? "PUT" : "POST";
    const urlFinal = id ? `${URL_UNIDADEMEDIDAS}/${id}` : URL_UNIDADEMEDIDAS;

    // Função enviarDados agora utiliza Toasts do app.js
    enviarDados(urlFinal, dados, function () {
        exibirMensagem("Unidade de Medida processada com sucesso!");
        limparFormulario();
        listarProdutos();
    }, metodo);
}

/**
 * Carrega os dados de uma UM para edição.
 */
function prepararEdicao(id) {
    exibirCarregando();
    $.get(`${URL_UNIDADEMEDIDAS}/${id}`, function (und) {
        $("#id").val(und.id);
        $("#descricao").val(und.descricao);

        // CORREÇÃO CRÍTICA: Faz as labels subirem para não sobrepor o texto
        M.updateTextFields();

        // Scroll suave para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })
        .fail(function() {
            exibirMensagem("Erro ao buscar dados da unidade de medida.");
        })
        .always(ocultarCarregando);
}

/**
 * Exclui uma um.
 */function excluirUnidadeMedida(id) {
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
        url: `${URL_UNIDADEMEDIDAS}/${id}`,
        type: 'DELETE',
        success: function() {
            exibirMensagem("UM removida com sucesso!");

            // LIMPEZA: Se a um excluída era o que estava sendo editado, limpamos o form
            if ($("#id").val() == id) {
                limparFormulario();
            }

            listarUnidadeMedidas();

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
    $("#frmUnidadeMedidas")[0].reset();

    // 2. Limpa o ID oculto (essencial para não confundir POST com PUT)
    $("#id").val("");

    // 3. CORREÇÃO VISUAL: Força o Materialize a resetar as labels
    // Isso evita que a label fique "suspensa" em um campo vazio
    if (typeof M !== "undefined") {
        M.updateTextFields();
    }
}