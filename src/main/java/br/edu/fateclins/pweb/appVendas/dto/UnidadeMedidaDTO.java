package br.edu.fateclins.pweb.appVendas.dto;

import jakarta.validation.constraints.NotBlank;

public record UnidadeMedidaDTO(@NotBlank String descricao, String sigla) {
}
