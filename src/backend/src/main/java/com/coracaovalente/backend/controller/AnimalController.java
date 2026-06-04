package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.AnimalControllerDocs;
import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.model.animal.Animal;
import com.coracaovalente.backend.model.animal.Gender;
import com.coracaovalente.backend.model.animal.Race;
import com.coracaovalente.backend.services.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animal")
@RequiredArgsConstructor
public class AnimalController implements AnimalControllerDocs {

    private final AnimalService animalService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Animal> registerAnimal (@ModelAttribute @Valid AnimalRequestDTO request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(animalService.registerAnimal(request));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Animal> editAnimal (@PathVariable Long id, @ModelAttribute @Valid AnimalRequestDTO request) {
        return ResponseEntity.ok().body(animalService.editAnimal(id, request));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteAnimal (@PathVariable Long id) {
        animalService.deleteAnimal(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/adopt")
    public ResponseEntity<Animal> markAsAdopted (@PathVariable Long id) {
        return ResponseEntity.ok().body(animalService.markAsAdopted(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimal (@PathVariable Long id) {
        return ResponseEntity.ok().body(animalService.getAnimal(id));
    }

    @GetMapping
    public ResponseEntity<List<Animal>> getAnimals (
            @RequestParam(required = false) Boolean isAdopted,
            @RequestParam(required = false) Race race,
            @RequestParam(required = false) Gender gender,
            @RequestParam(required = false) List<Long> tagIds
    ) {
        return ResponseEntity.ok().body(animalService.getAnimals(isAdopted, race, gender, tagIds));
    }
}
