package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Tag", description = "Controlador para gerenciamento de tags (Somente ADMIN)")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface TagControllerDocs {

    @Operation(summary = "Cria uma tag", description = "Método para criar uma tag no sistema")
    @ApiResponse(responseCode = "201", description = "Tag criada com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "409", description = "Tag (nome) já existe", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<com.coracaovalente.backend.model.animal.Tag> createTag (String name);


    @Operation(summary = "Exclue uma tag", description = "Método para excluir uma tag")
    @ApiResponse(responseCode = "204", description = "Tag excluida com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Tag não encontrada", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Void> deleteTag(Long id);
}
