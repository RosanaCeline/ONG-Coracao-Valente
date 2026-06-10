package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.PixConfigRequestDTO;
import com.coracaovalente.backend.exception.PixConfigNotFoundException;
import com.coracaovalente.backend.model.payment.PaymentConfig;
import com.coracaovalente.backend.repository.PaymentConfigRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentConfigService {

    private final PaymentConfigRepository paymentConfigRepository;

    public PaymentConfig getPaymentConfig () {
        return paymentConfigRepository.findById(1L)
                .orElseThrow(PixConfigNotFoundException::new);
    }

    @Transactional
    public PaymentConfig savePixConfig (PixConfigRequestDTO request) {
        PaymentConfig paymentConfig = paymentConfigRepository.findById(1L)
                .orElse(new PaymentConfig());

        paymentConfig.setId(1L);
        paymentConfig.setPixKey(request.pixKey().trim());
        paymentConfig.setPixBank(request.pixBank().trim());
        paymentConfig.setPixName(request.pixName().trim());
        paymentConfig.setPixKeyType(request.pixKeyType());
        paymentConfig.setPixCity(request.pixCity().trim());

        return paymentConfigRepository.save(paymentConfig);
    }

    @Transactional
    public void deletePixConfig () {
        PaymentConfig paymentConfig = paymentConfigRepository.findById(1L)
                .orElseThrow(PixConfigNotFoundException::new);

        paymentConfig.setPixKey(null);
        paymentConfig.setPixBank(null);
        paymentConfig.setPixName(null);
        paymentConfig.setPixKeyType(null);
        paymentConfig.setPixCity(null);
    }
}
