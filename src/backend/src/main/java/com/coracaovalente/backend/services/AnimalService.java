package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.exception.AnimalNotFoundException;
import com.coracaovalente.backend.model.animal.Animal;
import com.coracaovalente.backend.model.animal.Gender;
import com.coracaovalente.backend.model.animal.Race;
import com.coracaovalente.backend.model.animal.Tag;
import com.coracaovalente.backend.repository.AnimalRepository;
import com.coracaovalente.backend.repository.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
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

    @Transactional
    public Animal editAnimal (Long id, AnimalRequestDTO request) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(AnimalNotFoundException::new);

        List<Tag> tags = tagRepository.findAllById(request.tagIds());

        animal.setName(request.name().trim());
        animal.setAge(request.age().trim().toLowerCase());
        animal.setGender(request.gender());
        animal.setRace(request.race());
        animal.setPhoneNumber(request.phoneNumber() != null ? request.phoneNumber().trim() : null);
        animal.setTags(tags);

        if (request.photo() != null && !request.photo().isEmpty()) {
            String photoUrl = cloudinaryService.uploadPhoto(request.photo(), animal.getId());
            animal.setPhotoUrl(photoUrl);
        }

        return animal;
    }

    @Transactional
    public void deleteAnimal (Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(AnimalNotFoundException::new);

        cloudinaryService.deletePhoto(id);
        animalRepository.deleteById(animal.getId());
    }

    @Transactional
    public Animal markAsAdopted (Long id) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(AnimalNotFoundException::new);

        animal.setIsAdopted(true);

        return animal;
    }

    public Animal getAnimal (Long id) {
        return animalRepository.findById(id)
                .orElseThrow(AnimalNotFoundException::new);
    }

    public List<Animal> getAnimals (Boolean isAdopted, Race race, Gender gender, List<Long> tagIds) {
        List<Specification<Animal>> specs = new ArrayList<>();

        if (isAdopted != null)
            specs.add((root, query, cb) -> cb.equal(root.get("isAdopted"), isAdopted));
        if (race != null)
            specs.add((root, query, cb) -> cb.equal(root.get("race"), race));
        if (gender != null)
            specs.add((root, query, cb) -> cb.equal(root.get("gender"), gender));
        if (tagIds != null && !tagIds.isEmpty())
            specs.add((root, query, cb) -> root.join("tags").get("id").in(tagIds));

        return animalRepository.findAll(Specification.allOf(specs));
    }
}
