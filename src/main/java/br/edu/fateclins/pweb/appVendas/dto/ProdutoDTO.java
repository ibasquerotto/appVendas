package br.edu.fateclins.pweb.appVendas.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public record ProdutoDTO(Integer id, @NotBlank String nome, double precoCusto, double precoVenda,
                         int estoque, int estoqueMinimo, Integer unidadeMedidaId, String UnidadeSigla) {
}

