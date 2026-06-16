package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.DocumentControllerDocs;
import com.coracaovalente.backend.data.dto.response.DocumentResponseDTO;
import com.coracaovalente.backend.services.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/document")
@RequiredArgsConstructor
public class DocumentController implements DocumentControllerDocs {

    private final DocumentService documentService;

    @Override
    @GetMapping
    public ResponseEntity<Map<String, DocumentResponseDTO>> getDocuments() {
        return ResponseEntity.ok(documentService.getDocuments());
    }

    @Override
    @PostMapping(value = "/{slotId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentResponseDTO> uploadDocument(
            @PathVariable String slotId,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(documentService.uploadDocument(slotId, file));
    }

    @Override
    @DeleteMapping("/{slotId}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String slotId) {
        documentService.deleteDocument(slotId);
        return ResponseEntity.noContent().build();
    }
}
