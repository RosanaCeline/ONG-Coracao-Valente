package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.model.animal.Animal;
import com.coracaovalente.backend.model.animal.Tag;
import com.coracaovalente.backend.repository.AnimalRepository;
import com.coracaovalente.backend.repository.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    private final TagRepository tagRepository;

    private final CloudinaryService cloudinaryService;

    @Transactional
    public Animal registerAnimal (AnimalRequestDTO request) {
        List<Tag> tags = tagRepository.findAllById(request.tagIds());

        Animal newAnimal = new Animal(
                request.name().trim(),
                request.age().trim().toLowerCase(),
                request.gender(),
                request.race(),
                request.phoneNumber() != null ? request.phoneNumber().trim() : null,
                tags,
                LocalDateTime.now(ZoneId.of("America/Sao_Paulo"))
        );

        Animal animal = animalRepository.save(newAnimal);

        String photoUrl = cloudinaryService.uploadPhoto(request.photo(), animal.getId());

        animal.setPhotoUrl(photoUrl);

        return animal;
    }
}
