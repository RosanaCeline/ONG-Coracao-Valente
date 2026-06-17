package com.coracaovalente.backend.data.dto.request;

import com.coracaovalente.backend.model.financial.ExpenseCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

@Schema(name = "ExpenseRequestDTO", description = "DTO para registrar ou editar um gasto")
public record ExpenseRequestDTO(

        @Schema(description = "Categoria do gasto", example = "ALIMENTACAO")
        @NotNull(message = "Categoria é obrigatória")
        ExpenseCategory category,

        @Schema(description = "Descrição do gasto", example = "Ração e mantimentos — junho")
        String description,

        @Schema(description = "Valor do gasto", example = "189.98")
        @NotNull(message = "Valor é obrigatório")
        @Positive(message = "Valor deve ser positivo")
        BigDecimal value,

        @Schema(description = "Data do gasto", example = "2026-06-01")
        @NotNull(message = "Data é obrigatória")
        LocalDate date
) {}
