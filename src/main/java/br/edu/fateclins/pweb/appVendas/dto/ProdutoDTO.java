package br.edu.fateclins.pweb.appVendas.dto;

import br.edu.fateclins.pweb.appVendas.modelo.UnidadeMedida;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProdutoDTO(Integer id, @NotBlank String nome, double precoCusto, double precoVenda,
                         int estoque, int estoqueMinimo, @NotNull UnidadeMedida unidadeMedida) {
}

