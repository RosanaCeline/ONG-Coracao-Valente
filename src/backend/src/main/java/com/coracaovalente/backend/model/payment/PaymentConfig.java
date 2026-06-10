package com.coracaovalente.backend.model.payment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentConfig {

    @Id
    private Long id = 1L;

    @Column(name = "pix_key", length = 140)
    private String pixKey;

    @Column(name = "pix_bank", length = 100)
    private String pixBank;

    @Column(name = "pix_name", length = 100)
    private String pixName;

    @Column(name = "pix_key_type")
    @Enumerated(EnumType.STRING)
    private PixKeyType pixKeyType;

    @Column(name = "pix_city")
    private String pixCity;

    // Posteriormente, pode-se adicionar cartões também
}
