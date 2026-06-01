package com.coracaovalente.backend.model.animal;

import jakarta.persistence.*;

@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = true, unique = true, length = 20)
    private String name; // "Dócil", "Carinhosa", "Castrada"
}
