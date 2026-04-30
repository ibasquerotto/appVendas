package br.edu.fateclins.pweb.appVendas.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public record ProdutoDTO(@NotBlank String nome, double precoCusto, double precoVenda,
                         int estoque, int estoqueMinimo) {
}

