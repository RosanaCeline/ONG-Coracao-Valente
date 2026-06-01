package com.coracaovalente.backend.model.animal;

import jakarta.persistence.*;
import lombok.*;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "animals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "age", nullable = false, length = 50)
    private String age;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "race", nullable = false, length = 10)
    private Race race;

    @Column(name = "photo_url", nullable = false, length = 255)
    private String photoUrl;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber; // opcional

    @Column(name = "observations", length = 300)
    private TextArea observations; // opcional

    @ManyToMany
    @JoinTable(name = "animal_tags")
    private List<Tag> tags = new ArrayList<>(); // opcional
}
