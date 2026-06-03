package com.coracaovalente.backend.data.dto.request;

import com.coracaovalente.backend.model.animal.Gender;
import com.coracaovalente.backend.model.animal.Race;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@Schema(name = "AnimalRequestDTO", description = "DTO para que o usuário crie ou edite um animal")
public record AnimalRequestDTO(
        @Schema(description = "Nome do animal", example = "Pituca")
        @NotBlank(message = "Nome é obrigatório")
        String name,

        @Schema(description = "Idade do animal", example = "1 ano")
        @NotBlank(message = "Idade é obrigatória")
        String age,

        @Schema(description = "Sexo do animal", example = "FEMALE/MALE")
        @NotNull(message = "Sexo é obrigatório")
        Gender gender,

        @Schema(description = "Raça do animal", example = "DOG")
        @NotNull(message = "Raça é obrigatória")
        Race race,

        @Schema(description = "Foto do animal")
        @NotNull(message = "Foto é obrigatória")
        MultipartFile photo,

        @Schema(description = "Telefone para contato do responsável", example = "(88) 99123-4567")
        String phoneNumber,

        @Size(max = 5, message = "Animal pode ter no máximo 5 tags")
        List tagIds
) {}
