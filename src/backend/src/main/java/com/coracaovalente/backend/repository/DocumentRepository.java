package com.coracaovalente.backend.repository;

import com.coracaovalente.backend.model.document.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<Document> findBySlotId(String slotId);
}
