package com.coracaovalente.backend.repository;

import com.coracaovalente.backend.model.animal.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
