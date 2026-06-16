package com.coracaovalente.backend.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.coracaovalente.backend.exception.InvalidMediaTypeException;
import com.coracaovalente.backend.exception.MediaFileTooLargeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadPhoto(MultipartFile photo, Long id) {
        String mimeType = photo.getContentType();
        long size = photo.getSize();

        if (mimeType == null || !mimeType.startsWith("image/")) {
            throw new InvalidMediaTypeException();
        }

        if (size > 10 * 1024 * 1024) {
            throw new MediaFileTooLargeException();
        }

        try {
            String publicId = "animal_" + id;

            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    photo.getBytes(),
                    Map.of(
                            "folder", "animal_pics",
                            "public_id", publicId,
                            "overwrite", true,
                            "resource_type", "image"
                    )
            );
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Erro ao fazer upload para Cloudinary", e);
        }
    }

    public void deletePhoto(Long id) {
        try {
            cloudinary.uploader().destroy("animal_pics/animal_" + id, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Erro ao deletar foto do Cloudinary", e);
        }
    }

    public String uploadDocument(MultipartFile file, String slotId) {
        long size = file.getSize();

        if (size > 20 * 1024 * 1024) {
            throw new MediaFileTooLargeException();
        }

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of(
                            "folder",        "ong_documents",
                            "public_id",     "doc_" + slotId,
                            "overwrite",     true,
                            "resource_type", "raw"
                    )
            );
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Erro ao fazer upload do documento para Cloudinary", e);
        }
    }

    public void deleteDocument(String cloudinaryPublicId) {
        try {
            cloudinary.uploader().destroy(cloudinaryPublicId, Map.of("resource_type", "raw"));
        } catch (IOException e) {
            throw new RuntimeException("Erro ao deletar documento do Cloudinary", e);
        }
    }
}
