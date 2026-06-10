package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.request.PixConfigRequestDTO;
import com.coracaovalente.backend.data.dto.response.QrCodeResponseDTO;
import com.coracaovalente.backend.model.payment.PaymentConfig;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Pagamento", description = "Controlador para pagamento de doações")
public interface PaymentConfigControllerDocs {


    @Operation(
            summary = "Lista os dados de pagamento Pix",
            description = "Método para listar todos os dados de pagamento pix"
    )
    @ApiResponse(responseCode = "200", description = "Pix encontrado com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "404", description = "Dados do pix não encontrados", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    public ResponseEntity<PaymentConfig> getPaymentConfig ();


    @Operation(
            summary = "Salva os dados para pagamento pix",
            description = "Método para salvar os dados para pagamento pix"
    )
    @ApiResponse(responseCode = "200", description = "Dados salvos com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    public ResponseEntity<PaymentConfig> savePixConfig (PixConfigRequestDTO request);


    @Operation(
            summary = "Exclue os dados do pagamento pix",
            description = "Método para excluir dados do pagamento pix"
    )
    @ApiResponse(responseCode = "204", description = "Dados excluidos com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "403", description = "Acesso negado", content = @Content)
    @ApiResponse(responseCode = "404", description = "Dados do pix não encontrados", content = @Content)
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    public ResponseEntity<Void> deletePixConfig ();


    @Operation(summary = "Gera QR Code", description = "Método para gerar QR code com base nos dados de pagamento pix")
    @ApiResponse(responseCode = "200", description = "QR code retornado com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro inesperado no servidor", content = @Content)
    @ApiResponse(responseCode = "503", description = "O administrador ainda não configurou os dados do Pix. Tente novamente mais tarde.", content = @Content)
    public ResponseEntity<QrCodeResponseDTO> getQrCode(Double amount, String descricao);
}
