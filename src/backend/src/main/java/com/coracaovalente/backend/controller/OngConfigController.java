package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.OngConfigControllerDocs;
import com.coracaovalente.backend.data.dto.request.OngConfigRequestDTO;
import com.coracaovalente.backend.model.ong.OngConfig;
import com.coracaovalente.backend.services.OngConfigService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ong")
@RequiredArgsConstructor
public class OngConfigController implements OngConfigControllerDocs {

    private final OngConfigService ongConfigService;

    @Override
    @GetMapping
    public ResponseEntity<OngConfig> getOngConfig() {
        return ResponseEntity.ok(ongConfigService.getOngConfig());
    }

    @Override
    @PutMapping
    public ResponseEntity<OngConfig> updateOngConfig(@RequestBody @Valid OngConfigRequestDTO request) {
        return ResponseEntity.ok(ongConfigService.updateOngConfig(request));
    }
}
