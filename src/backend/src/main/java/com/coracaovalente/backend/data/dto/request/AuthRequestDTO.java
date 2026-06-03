package com.coracaovalente.backend.data.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "AuthRequestDTO", description = "DTO para que o usuário se cadastre ou faça login na área administrativa")
public record AuthRequestDTO(
        @Schema(description = "Email do usuário", example = "coracaovalente@gmail.com")
        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        @Schema(description = "Senha do usuário", example = "ong123@")
        @NotBlank(message = "Senha é obrigatória")
        String password
) {}
