package com.coracaovalente.backend.repository;

import com.coracaovalente.backend.model.animal.Animal;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface AnimalRepository extends JpaRepository<Animal, Long>, JpaSpecificationExecutor<Animal> {

    @EntityGraph(attributePaths = "tags")
    List<Animal> findAll(Specification<Animal> spec);

    @EntityGraph(attributePaths = "tags")
    Optional<Animal> findById(Long id);
}
