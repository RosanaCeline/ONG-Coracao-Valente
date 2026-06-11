package com.coracaovalente.backend.data.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "QrCodeResponse", description = "DTO de dados retornados para exibição do QR Code Pix")
public record QrCodeResponseDTO(

        @Schema(description = "Imagem do QR Code em Base64 (formato data:image/png;base64,...)",
                example = "data:image/png;base64,iVBORw0KGgo...")
        String qrcode,

        @Schema(description = "Código Pix copia e cola no padrão BR Code (EMV)",
                example = "00020126580014BR.GOV.BCB.PIX0136ong@email.com...")
        String copyPaste,

        @Schema(description = "Nome do recebedor",
                example = "ONG Coracao Valente")
        String pixName,

        @Schema(description = "Chave Pix do recebedor",
                example = "ong@email.com")
        String pixKey,

        @Schema(description = "Banco do recebedor",
                example = "Nubank")
        String pixBank
) {}
