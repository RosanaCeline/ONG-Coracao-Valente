package com.coracaovalente.backend.model.animal;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
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
    @Column(name = "gender", nullable = false, length = 10)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "race", nullable = false, length = 10)
    private Race race;

    @Column(name = "photo_url", length = 255)
    private String photoUrl;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @ManyToMany
    @JoinTable(name = "animal_tags")
    private List<Tag> tags = new ArrayList<>();

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;

    @Column(name = "is_adopted", nullable = false)
    private Boolean isAdopted = false;

    public Animal(String name, String age, Gender gender, Race race,
                  String phoneNumber, List<Tag> tags, LocalDateTime registeredAt) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.race = race;
        this.phoneNumber = phoneNumber;
        this.tags = tags != null ? tags : new ArrayList<>();
        this.registeredAt = registeredAt;
        this.isAdopted = false;
    }
}
