package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.AnimalControllerDocs;
import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.model.animal.Animal;
import com.coracaovalente.backend.services.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/animal")
@RequiredArgsConstructor
public class AnimalController implements AnimalControllerDocs {

    private final AnimalService animalService;

    @PostMapping(value = "/", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Animal> registerAnimal (@ModelAttribute @Valid AnimalRequestDTO request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(animalService.registerAnimal(request));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Animal> editAnimal (@PathVariable Long id, @ModelAttribute @Valid AnimalRequestDTO request) {
        return ResponseEntity.ok().body(animalService.editAnimal(id, request));
    }
}
