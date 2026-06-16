package com.coracaovalente.backend.data.dto.response;

import java.time.LocalDateTime;

public record DocumentResponseDTO(
        String fileName,
        String fileType,
        String url,
        LocalDateTime uploadedAt
) {}
