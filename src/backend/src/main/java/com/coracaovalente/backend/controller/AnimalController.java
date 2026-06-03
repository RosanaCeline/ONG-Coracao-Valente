package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.data.dto.request.AnimalRequestDTO;
import com.coracaovalente.backend.model.animal.Animal;
import com.coracaovalente.backend.services.AnimalService;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/animal")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    @PostMapping("/")
    public ResponseEntity<Animal> registerAnimal (@RequestBody @Valid AnimalRequestDTO request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(animalService.registerAnimal(request));
    }
}
