package com.coracaovalente.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MediaFileTooLargeException extends RuntimeException {
    public MediaFileTooLargeException() {
        super("Imagem excede o limite de 10MB");
    }

    public MediaFileTooLargeException(String message) {
        super(message);
    }
}
