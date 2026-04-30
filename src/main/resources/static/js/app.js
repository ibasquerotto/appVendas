/**
 * app.js - Funções globais de utilidade para a aplicação AppVendas.
 * Centraliza a comunicação AJAX e o controle de feedback visual (modais).
 */
$(document).ready(function() {
    // Inicializa componentes do Materialize (Modais, etc)
    const modais = document.querySelectorAll('.modal');
    if (typeof M !== "undefined") {
        M.Modal.init(modais);
    }
});

/**
 * Função unificada para envio de dados (POST/PUT).
 */
function enviarDados(url, dados, callbackSucesso, metodo = "POST") {
    exibirCarregando();

    $.ajax({
        type: metodo,
        url: url,
        data: JSON.stringify(dados),
        contentType: 'application/json; charset=utf-8',
        success: function(resposta) {
            if (callbackSucesso) callbackSucesso(resposta);
        },
        error: function(xhr) {
            console.error("Erro na requisição:", xhr);
            const msgErro = xhr.responseJSON?.message || "Erro ao processar requisição.";
            exibirMensagem("Erro: " + msgErro);
        },
        complete: function() {
            ocultarCarregando();
        }
    });
}

/**
 * Exibe mensagens curtas usando o Toast do Materialize (substitui o dialog).
 * @param {string} msg - Texto da mensagem.
 */
function exibirMensagem(msg) {
    if (typeof M !== "undefined") {
        M.toast({
            html: msg,
            classes: 'rounded blue darken-3',
            displayLength: 4000
        });
    } else {
        alert(msg); // Fallback caso o Materialize não carregue
    }
}

/**
 * Controla o Modal de carregamento do Materialize.
 */
function exibirCarregando() {
    const modalElem = document.getElementById('dialogAguarde');
    if (modalElem) {
        const instance = M.Modal.getInstance(modalElem) || M.Modal.init(modalElem, { dismissible: false });
        instance.open();
    }
}

/**
 * Fecha o Modal de carregamento.
 */
function ocultarCarregando() {
    const modalElem = document.getElementById('dialogAguarde');
    if (modalElem) {
        const instance = M.Modal.getInstance(modalElem);
        if (instance && instance.isOpen) {
            instance.close();
        }
    }
}