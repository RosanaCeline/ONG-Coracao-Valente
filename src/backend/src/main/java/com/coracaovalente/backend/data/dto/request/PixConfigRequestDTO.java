package com.coracaovalente.backend.data.dto.request;

import com.coracaovalente.backend.model.payment.PixKeyType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(name = "PixConfigRequestDTO", description = "DTO para que o usuário adicione ou modifique uma chave pix")
public record PixConfigRequestDTO(
        @Schema(description = "Chave pix", example = "+5561912345678")
        @NotBlank(message = "Chave pix é obrigatória")
        String pixKey,

        @Schema(description = "Banco do pix", example = "Nubank")
        @NotBlank(message = "Banco do pix é obrigatório")
        String pixBank,

        @Schema(description = "Nome do recebedor", example = "Ong Coração Valente")
        @NotBlank(message = "Nome do recebedor é obrigatório")
        String pixName,

        @Schema(description = "Tipo da chave pix", example = "CPF/CNPJ/EMAIL/PHONE/RANDOM")
        @NotNull(message = "Tipo da chave é obrigatório")
        PixKeyType pixKeyType,

        @Schema(description = "Cidade do recebedor", example = "Tianguá")
        @NotBlank(message = "Cidade do recebedor é obrigatória")
        String pixCity
) {}
