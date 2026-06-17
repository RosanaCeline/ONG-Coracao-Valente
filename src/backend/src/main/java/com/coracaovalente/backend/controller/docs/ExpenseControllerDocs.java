package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.request.ExpenseRequestDTO;
import com.coracaovalente.backend.data.dto.response.ExpenseBreakdownDTO;
import com.coracaovalente.backend.model.financial.Expense;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Gastos", description = "Controlador para gerenciamento de gastos da ONG")
public interface ExpenseControllerDocs {

    @Operation(summary = "Lista todos os gastos", description = "Ordenado por data desc")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<List<Expense>> getExpenses();

    @Operation(summary = "Retorna breakdown de gastos por categoria", description = "Endpoint público — usado pelo gráfico na página de doações e no painel admin")
    @ApiResponse(responseCode = "200", description = "Breakdown retornado com sucesso")
    ResponseEntity<List<ExpenseBreakdownDTO>> getBreakdown();

    @Operation(summary = "Registra um novo gasto")
    @ApiResponse(responseCode = "201", description = "Gasto registrado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Expense> addExpense(ExpenseRequestDTO request);

    @Operation(summary = "Edita um gasto existente")
    @ApiResponse(responseCode = "200", description = "Gasto atualizado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Gasto não encontrado", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Expense> updateExpense(Long id, ExpenseRequestDTO request);

    @Operation(summary = "Remove um gasto")
    @ApiResponse(responseCode = "204", description = "Gasto removido com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Gasto não encontrado", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Void> deleteExpense(Long id);
}
