package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.response.DocumentResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Tag(name = "Documentos", description = "Gestão de documentos institucionais da ONG")
public interface DocumentControllerDocs {

    @Operation(summary = "Lista todos os documentos enviados")
    @ApiResponse(responseCode = "200", description = "Mapa de documentos por slot retornado com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Map<String, DocumentResponseDTO>> getDocuments();

    @Operation(summary = "Faz upload de um documento para um slot", description = "Substitui o arquivo anterior do slot, se houver")
    @ApiResponse(responseCode = "200", description = "Documento enviado com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "413", description = "Arquivo excede o limite de 20 MB", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<DocumentResponseDTO> uploadDocument(String slotId, MultipartFile file);

    @Operation(summary = "Remove o documento de um slot")
    @ApiResponse(responseCode = "204", description = "Documento removido com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Documento não encontrado para o slot", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Void> deleteDocument(String slotId);
}
