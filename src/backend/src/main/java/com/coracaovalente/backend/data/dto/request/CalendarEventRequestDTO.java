package com.coracaovalente.backend.data.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Schema(name = "CalendarEventRequestDTO", description = "DTO para criar ou editar um evento no calendário")
public record CalendarEventRequestDTO(

        @Schema(description = "Título do evento", example = "Campanha antirrábica")
        @NotBlank String title,

        @Schema(description = "Categoria do evento", example = "vacinacao",
                allowableValues = {"vacinacao", "castracao", "prazo", "evento", "reuniao"})
        @NotBlank String category,

        @Schema(description = "Data do evento", example = "2026-07-15")
        @NotNull LocalDate date,

        @Schema(description = "Observações opcionais", example = "Praça central, das 8h às 12h")
        String notes
) {}
