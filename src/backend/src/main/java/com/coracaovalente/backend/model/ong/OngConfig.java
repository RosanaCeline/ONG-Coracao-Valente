package com.coracaovalente.backend.model.ong;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ong_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OngConfig {

    @Id
    private Long id = 1L;

    @Column(name = "name", length = 150)
    private String name;

    @Column(name = "cnpj", length = 20)
    private String cnpj;

    @Column(name = "responsible_name", length = 150)
    private String responsibleName;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "number", length = 50)
    private String number;

    @Column(name = "neighborhood", length = 100)
    private String neighborhood;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 50)
    private String state;

    @Column(name = "cep", length = 10)
    private String cep;

    @Column(name = "volunteers")
    private Integer volunteers;

    @Column(name = "whatsapp_number", length = 30)
    private String whatsappNumber;

    @Column(name = "instagram_url", length = 255)
    private String instagramUrl;

    @Column(name = "instagram_handle", length = 100)
    private String instagramHandle;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;
}
