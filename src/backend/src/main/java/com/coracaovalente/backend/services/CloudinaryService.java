package com.coracaovalente.backend.services;

import com.cloudinary.Cloudinary;
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
}
