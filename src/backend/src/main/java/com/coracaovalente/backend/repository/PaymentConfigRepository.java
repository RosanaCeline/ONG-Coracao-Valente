package com.coracaovalente.backend.repository;

import com.coracaovalente.backend.model.payment.PaymentConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentConfigRepository extends JpaRepository<PaymentConfig, Long> {
}
