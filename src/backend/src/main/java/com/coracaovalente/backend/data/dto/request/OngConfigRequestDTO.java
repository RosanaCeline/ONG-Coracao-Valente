package com.coracaovalente.backend.data.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "OngConfigRequestDTO", description = "DTO para atualizar as informações da ONG")
public record OngConfigRequestDTO(

        @Schema(description = "Nome da ONG", example = "ONG Coração Valente")
        String name,

        @Schema(description = "CNPJ da ONG", example = "00.000.000/0000-00")
        String cnpj,

        @Schema(description = "Nome do responsável", example = "Maria Silva")
        String responsibleName,

        @Schema(description = "Logradouro", example = "Av. Manoel da Custódia")
        String address,

        @Schema(description = "Número", example = "nº 1.111")
        String number,

        @Schema(description = "Bairro", example = "Bairro São Geraldo")
        String neighborhood,

        @Schema(description = "Cidade", example = "Tianguá")
        String city,

        @Schema(description = "Estado (UF)", example = "CE")
        String state,

        @Schema(description = "CEP", example = "62320-000")
        String cep,

        @Schema(description = "Número de voluntários", example = "12")
        Integer volunteers,

        @Schema(description = "Número do WhatsApp (DDI+DDD+número)", example = "5588999887766")
        String whatsappNumber,

        @Schema(description = "URL do Instagram", example = "https://www.instagram.com/ong.coracaovalente/")
        String instagramUrl,

        @Schema(description = "Handle do Instagram", example = "@ong.coracaovalente")
        String instagramHandle,

        @Schema(description = "URL da logo da ONG")
        String logoUrl
) {}
