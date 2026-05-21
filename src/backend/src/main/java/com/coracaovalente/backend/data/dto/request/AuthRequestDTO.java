package com.coracaovalente.backend.data.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(name = "LoginRequestDTO", description = "DTO para que o usuário faça login na área administrativa")
public record LoginRequestDTO(
        @Schema(description = "Email de login", example = "coracaovalente@gmail.com")
        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        @Schema(description = "Senha de login", example = "ong123@")
        @NotBlank(message = "Senha é obrigatória")
        String password
) {}
