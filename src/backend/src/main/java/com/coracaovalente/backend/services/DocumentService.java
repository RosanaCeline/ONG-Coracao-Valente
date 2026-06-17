package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.response.DocumentResponseDTO;
import com.coracaovalente.backend.exception.DocumentNotFoundException;
import com.coracaovalente.backend.model.document.Document;
import com.coracaovalente.backend.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final CloudinaryService  cloudinaryService;

    public Map<String, DocumentResponseDTO> getDocuments() {
        return documentRepository.findAll().stream()
                .collect(Collectors.toMap(Document::getSlotId, this::toDTO));
    }

    @Transactional
    public DocumentResponseDTO uploadDocument(String slotId, MultipartFile file) {
        Optional<Document> existing = documentRepository.findBySlotId(slotId);
        existing.ifPresent(doc -> cloudinaryService.deleteDocument(doc.getCloudinaryPublicId()));

        String url            = cloudinaryService.uploadDocument(file, slotId);
        String cloudinaryPublicId = "ong_documents/doc_" + slotId;

        Document document = existing.orElse(new Document());
        document.setSlotId(slotId);
        document.setFileName(file.getOriginalFilename() != null ? file.getOriginalFilename() : slotId);
        document.setFileType(file.getContentType() != null ? file.getContentType() : "application/octet-stream");
        document.setUrl(url);
        document.setCloudinaryPublicId(cloudinaryPublicId);
        document.setUploadedAt(LocalDateTime.now());

        return toDTO(documentRepository.save(document));
    }

    @Transactional
    public void deleteDocument(String slotId) {
        Document document = documentRepository.findBySlotId(slotId)
                .orElseThrow(DocumentNotFoundException::new);
        cloudinaryService.deleteDocument(document.getCloudinaryPublicId());
        documentRepository.delete(document);
    }

    private DocumentResponseDTO toDTO(Document d) {
        return new DocumentResponseDTO(d.getFileName(), d.getFileType(), d.getUrl(), d.getUploadedAt());
    }
}
