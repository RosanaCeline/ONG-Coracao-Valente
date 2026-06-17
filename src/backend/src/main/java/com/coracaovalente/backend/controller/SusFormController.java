package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.SusFormControllerDocs;
import com.coracaovalente.backend.data.dto.request.SusFormRequestDTO;
import com.coracaovalente.backend.services.SusFormService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sus")
@RequiredArgsConstructor
public class SusFormController implements SusFormControllerDocs {

    private final SusFormService susFormService;

    @Override
    @PostMapping
    public ResponseEntity<Void> answerForm (@RequestBody @Valid SusFormRequestDTO request) {
        susFormService.answerForm(request);
        return ResponseEntity.noContent().build();
    }
}
