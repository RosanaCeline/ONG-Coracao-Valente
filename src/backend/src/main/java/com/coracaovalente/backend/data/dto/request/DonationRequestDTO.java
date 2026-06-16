package com.coracaovalente.backend.data.dto.request;

import com.coracaovalente.backend.model.financial.DonationType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

@Schema(name = "DonationRequestDTO", description = "DTO para registrar ou editar uma doação recebida")
public record DonationRequestDTO(

        @Schema(description = "Nome do doador ou empresa", example = "Petshop Tianguá")
        @NotBlank(message = "Doador é obrigatório")
        String donor,

        @Schema(description = "Tipo da doação", example = "DINHEIRO")
        @NotNull(message = "Tipo é obrigatório")
        DonationType type,

        @Schema(description = "Descrição da doação", example = "Ração e medicamentos")
        String description,

        @Schema(description = "Valor da doação", example = "500.00")
        @NotNull(message = "Valor é obrigatório")
        @Positive(message = "Valor deve ser positivo")
        BigDecimal value,

        @Schema(description = "Data da doação", example = "2026-05-20")
        @NotNull(message = "Data é obrigatória")
        LocalDate date
) {}
