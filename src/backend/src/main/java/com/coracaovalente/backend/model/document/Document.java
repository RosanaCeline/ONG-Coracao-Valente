package com.coracaovalente.backend.model.document;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "document")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "slot_id", unique = true, nullable = false, length = 50)
    private String slotId;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "file_type", nullable = false, length = 100)
    private String fileType;

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "cloudinary_public_id", nullable = false, length = 300)
    private String cloudinaryPublicId;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;
}
