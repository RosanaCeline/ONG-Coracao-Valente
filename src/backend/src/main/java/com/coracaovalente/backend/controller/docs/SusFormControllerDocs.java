package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.data.dto.request.SusFormRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Formulário SUS", description = "Controlador para que os usuários respondam o formulário SUS")
public interface SusFormControllerDocs {

    @Operation(summary = "Responde o formulário", description = "Método para que o usuário responda o formulário")
    @ApiResponse(responseCode = "204", description = "Formulário respondido com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Void> answerForm (SusFormRequestDTO request);
}
