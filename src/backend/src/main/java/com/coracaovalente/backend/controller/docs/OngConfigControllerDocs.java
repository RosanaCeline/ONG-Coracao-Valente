package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.request.OngConfigRequestDTO;
import com.coracaovalente.backend.model.ong.OngConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "ONG", description = "Controlador para informações da ONG")
public interface OngConfigControllerDocs {

    @Operation(
            summary = "Retorna as informações da ONG",
            description = "Método público para obter os dados cadastrais da ONG"
    )
    @ApiResponse(responseCode = "200", description = "Informações retornadas com sucesso")
    @ApiResponse(responseCode = "404", description = "Configurações da ONG não encontradas", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    ResponseEntity<OngConfig> getOngConfig();

    @Operation(
            summary = "Atualiza as informações da ONG",
            description = "Método para atualizar os dados cadastrais da ONG (requer autenticação)"
    )
    @ApiResponse(responseCode = "200", description = "Informações atualizadas com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<OngConfig> updateOngConfig(OngConfigRequestDTO request);
}
