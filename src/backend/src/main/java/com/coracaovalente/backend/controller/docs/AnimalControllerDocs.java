package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.model.animal.Animal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Tag(name = "Animal", description = "Controlador para gerenciamento de animais")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface AnimalControllerDocs {

    @Operation(summary = "Cadastra um animal", description = "Método para cadastrar um animal no sistema",
            requestBody = @RequestBody(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
    )
    @ApiResponse(responseCode = "201", description = "Animal cadastrado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Animal> registerAnimal (AnimalRequestDTO request);
}
