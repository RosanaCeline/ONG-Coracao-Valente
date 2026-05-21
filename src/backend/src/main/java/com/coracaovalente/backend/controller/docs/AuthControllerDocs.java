package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.data.dto.request.AuthRequestDTO;
import com.coracaovalente.backend.data.dto.response.TokenResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Autenticação", description = "Controlador para autenticação de usuários")
public interface AuthControllerDocs {

    @Operation(summary = "Loga o usuário", description = "Método para logar o usuário no sistema")
    @ApiResponse(responseCode = "200", description = "Usuário logado com sucesso")
    @ApiResponse(responseCode = "400", description = "Credenciais inválidas")
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor")
    public ResponseEntity<TokenResponseDTO> login(@RequestBody @Valid AuthRequestDTO request);

    @Operation(summary = "Cadastra o usuário", description = "Método para cadastrar o usuário no sistema")
    @ApiResponse(responseCode = "201", description = "Usuário cadastrado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada")
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequestDTO request);
}
