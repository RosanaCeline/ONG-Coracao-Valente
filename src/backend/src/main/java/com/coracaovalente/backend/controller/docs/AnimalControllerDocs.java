package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.model.animal.Animal;
import com.coracaovalente.backend.model.animal.Gender;
import com.coracaovalente.backend.model.animal.Race;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

@Tag(name = "Animal", description = "Controlador para gerenciamento de animais")
@SecurityRequirement(name = SecurityConfig.SECURITY)
public interface AnimalControllerDocs {

    @Operation(summary = "Cadastra um animal", description = "Método para cadastrar um animal no sistema",
            requestBody = @RequestBody(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
    )
    @ApiResponse(responseCode = "201", description = "Animal cadastrado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Animal> registerAnimal (AnimalRequestDTO request);


    @Operation(summary = "Edita um animal", description = "Método para editar um animal já cadastrado no sistema",
            requestBody = @RequestBody(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
    )
    @ApiResponse(responseCode = "200", description = "Animal editado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Animal> editAnimal (Long id, @ModelAttribute @Valid AnimalRequestDTO request);


    @Operation(summary = "Exclue um animal", description = "Método para excluir um animal já cadastrado no sistema")
    @ApiResponse(responseCode = "204", description = "Animal excluido com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "404", description = "Animal não encontrado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Void> deleteAnimal (Long id);


    @Operation(summary = "Marcar um animal como adotado", description = "Método para marcar um animal informando que ele já foi adotado")
    @ApiResponse(responseCode = "200", description = "Animal marcado com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "404", description = "Animal não encontrado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Animal> markAsAdopted (Long id);


    @Operation(summary = "Busca um animal", description = "Método para buscar um animal pelo ID")
    @ApiResponse(responseCode = "200", description = "Animal encontrado com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "404", description = "Animal não encontrado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<Animal> getAnimal (Long id);


    @Operation(summary = "Lista animais", description = "Método para listar animais com filtros opcionais")
    @Parameter(name = "isAdopted", description = "Filtrar por status de adoção", required = false, example = "false")
    @Parameter(name = "race", description = "Filtrar por raça", required = false, example = "DOG")
    @Parameter(name = "gender", description = "Filtrar por sexo", required = false, example = "MALE")
    @Parameter(name = "tagIds", description = "Filtrar por IDs de tags", required = false, example = "1")
    @ApiResponse(responseCode = "200", description = "Lista de animais retornada com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    public ResponseEntity<List<Animal>> getAnimals (Boolean isAdopted, Race race, Gender gender, List<Long> tagIds);
}
