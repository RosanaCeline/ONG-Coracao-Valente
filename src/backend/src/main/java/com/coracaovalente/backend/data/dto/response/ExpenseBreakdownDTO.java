package com.coracaovalente.backend.data.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;

@Schema(name = "ExpenseBreakdownDTO", description = "Soma de gastos por categoria, para uso nos gráficos")
public record ExpenseBreakdownDTO(
        @Schema(description = "Identificador da categoria (nome do enum)", example = "ALIMENTACAO")
        String id,

        @Schema(description = "Rótulo legível da categoria", example = "Alimentação")
        String title,

        @Schema(description = "Total gasto nesta categoria", example = "189.98")
        BigDecimal value
) {}
