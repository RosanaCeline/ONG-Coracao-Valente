package com.coracaovalente.backend.data.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(name = "SusFormRequestDTO", description = "DTO para que o usuário responda o formulário SUS")
public record SusFormRequestDTO(
        @Schema(description = "Questão 1", example = "5")
        @NotNull(message = "Questão 1 é obrigatória")
        Integer q1,

        @Schema(description = "Questão 2", example = "1")
        @NotNull(message = "Questão 2 é obrigatória")
        Integer q2,

        @Schema(description = "Questão 3", example = "4")
        @NotNull(message = "Questão 3 é obrigatória")
        Integer q3,

        @Schema(description = "Questão 4", example = "1")
        @NotNull(message = "Questão 4 é obrigatória")
        Integer q4,

        @Schema(description = "Questão 5", example = "5")
        @NotNull(message = "Questão 5 é obrigatória")
        Integer q5,

        @Schema(description = "Questão 6", example = "2")
        @NotNull(message = "Questão 6 é obrigatória")
        Integer q6,

        @Schema(description = "Questão 7", example = "3")
        @NotNull(message = "Questão 7 é obrigatória")
        Integer q7,

        @Schema(description = "Questão 8", example = "5")
        @NotNull(message = "Questão 8 é obrigatória")
        Integer q8,

        @Schema(description = "Questão 9", example = "5")
        @NotNull(message = "Questão 9 é obrigatória")
        Integer q9,

        @Schema(description = "Questão 10", example = "1")
        @NotNull(message = "Questão 10 é obrigatória")
        Integer q10,

        @Schema(description = "Se o termo de consentimento livre e esclarecido (TCLE) foi assinado", example = "true")
        @NotNull(message = "TCLE é obrigatório")
        Boolean isTermAccepted
) {}
