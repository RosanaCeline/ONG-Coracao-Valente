package com.coracaovalente.backend.data.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "TokenResponseDTO", description = "DTO com token JWT retornado após autenticação")
public record TokenResponseDTO(
        @Schema(description = "Token JWT", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String token
) {}
