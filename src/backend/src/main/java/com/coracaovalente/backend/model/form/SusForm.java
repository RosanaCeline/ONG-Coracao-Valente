package com.coracaovalente.backend.model.form;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "form")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SusForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer q1;

    @Column(nullable = false)
    private Integer q2;

    @Column(nullable = false)
    private Integer q3;

    @Column(nullable = false)
    private Integer q4;

    @Column(nullable = false)
    private Integer q5;

    @Column(nullable = false)
    private Integer q6;

    @Column(nullable = false)
    private Integer q7;

    @Column(nullable = false)
    private Integer q8;

    @Column(nullable = false)
    private Integer q9;

    @Column(nullable = false)
    private Integer q10;

    @Column(nullable = false)
    private Double score;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt;

    @Column(name = "is_term_accepted", nullable = false)
    private Boolean isTermAccepted;
}
