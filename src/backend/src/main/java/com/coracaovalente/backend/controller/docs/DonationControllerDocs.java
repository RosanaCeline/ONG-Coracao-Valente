package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.request.DonationRequestDTO;
import com.coracaovalente.backend.model.financial.Donation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Doações", description = "Controlador para gerenciamento de doações recebidas")
public interface DonationControllerDocs {

    @Operation(summary = "Lista todas as doações recebidas", description = "Ordenado por data desc")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<List<Donation>> getDonations();

    @Operation(summary = "Registra uma nova doação recebida")
    @ApiResponse(responseCode = "201", description = "Doação registrada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Donation> addDonation(DonationRequestDTO request);

    @Operation(summary = "Edita uma doação existente")
    @ApiResponse(responseCode = "200", description = "Doação atualizada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Doação não encontrada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Donation> updateDonation(Long id, DonationRequestDTO request);

    @Operation(summary = "Remove uma doação")
    @ApiResponse(responseCode = "204", description = "Doação removida com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Doação não encontrada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Void> deleteDonation(Long id);
}
