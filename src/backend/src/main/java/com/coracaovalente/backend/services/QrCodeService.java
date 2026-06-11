package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.response.QrCodeResponseDTO;
import com.coracaovalente.backend.exception.PixConfigIncompleteException;
import com.coracaovalente.backend.exception.PixConfigNotFoundException;
import com.coracaovalente.backend.model.payment.PaymentConfig;
import com.coracaovalente.backend.repository.PaymentConfigRepository;
import com.coracaovalente.backend.util.QrCodeBuilder;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class QrCodeService {

    private final PaymentConfigRepository paymentConfigRepository;

    public QrCodeResponseDTO gerarQrCode(Double amount, String descricao) {
        PaymentConfig config = paymentConfigRepository.findById(1L)
                .orElseThrow(PixConfigNotFoundException::new);

        if (config.getPixKey() == null || config.getPixKeyType() == null
                || config.getPixName() == null || config.getPixCity() == null) {
            throw new PixConfigIncompleteException();
        }

        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException("Valor da doação deve ser maior que zero");
        }

        String brCode = QrCodeBuilder.build(
                config.getPixKey(),
                config.getPixKeyType().name(),
                config.getPixName(),
                config.getPixCity(),
                descricao,
                amount
        );

        String base64 = gerarImagemBase64(brCode);

        return new QrCodeResponseDTO(
                base64,
                brCode,
                config.getPixName(),
                config.getPixKey(),
                config.getPixBank() != null ? config.getPixBank() : ""
        );
    }

    private String gerarImagemBase64(String brCode) {
        try {
            var writer = new QRCodeWriter();
            var matrix = writer.encode(brCode, BarcodeFormat.QR_CODE, 300, 300);
            var out = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(matrix, "PNG", out);
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(out.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar QR Code", e);
        }
    }
}
