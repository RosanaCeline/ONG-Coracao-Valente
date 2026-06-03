package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.model.animal.Animal;
import com.coracaovalente.backend.model.animal.Tag;
import com.coracaovalente.backend.repository.AnimalRepository;
import com.coracaovalente.backend.repository.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    private final TagRepository tagRepository;

    @Transactional
    public Animal registerAnimal (AnimalRequestDTO request) {
        String photoUrl = uploadPhoto(request.photo());

        List<Tag> tags = tagRepository.findAllById(request.tagIds());

        Animal newAnimal = new Animal(
                request.name().trim(),
                request.age().trim().toLowerCase(),
                request.gender(),
                request.race(),
                photoUrl,
                request.phoneNumber() != null ? request.phoneNumber().trim() : null,
                tags,
                LocalDateTime.now(ZoneId.of("America/Sao_Paulo"))
        );

        return animalRepository.save(newAnimal);
    }

    private String uploadPhoto(MultipartFile photo) {
        if (photo == null || photo.isEmpty()) return null;

        return "Vou fazer depois";
    }
}
