package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.PaymentConfigControllerDocs;
import com.coracaovalente.backend.data.dto.request.PixConfigRequestDTO;
import com.coracaovalente.backend.data.dto.response.QrCodeResponseDTO;
import com.coracaovalente.backend.model.payment.PaymentConfig;
import com.coracaovalente.backend.services.PaymentConfigService;
import com.coracaovalente.backend.services.QrCodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/payment")
@RequiredArgsConstructor
public class PaymentConfigController implements PaymentConfigControllerDocs {

    private final PaymentConfigService paymentConfigService;

    private final QrCodeService qrCodeService;

    @GetMapping
    public ResponseEntity<PaymentConfig> getPaymentConfig () {
        return ResponseEntity.ok().body(paymentConfigService.getPaymentConfig());
    }

    @PutMapping("/pix")
    public ResponseEntity<PaymentConfig> savePixConfig (@RequestBody @Valid PixConfigRequestDTO request) {
        return ResponseEntity.ok().body(paymentConfigService.savePixConfig(request));
    }

    @DeleteMapping("/pix")
    public ResponseEntity<Void> deletePixConfig () {
        paymentConfigService.deletePixConfig();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/qrcode")
    public ResponseEntity<QrCodeResponseDTO> getQrCode(
            @RequestParam(required = false) Double amount,
            @RequestParam(required = false) String descricao
    ) {
        return ResponseEntity.ok().body(qrCodeService.gerarQrCode(amount, descricao));
    }
}
