package com.coracaovalente.backend.repository;

import com.coracaovalente.backend.model.animal.Tag;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findAllById(java.awt.@Size(max = 5, message = "Animal pode ter no máximo 5 tags") List list);
}
