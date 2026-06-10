package com.coracaovalente.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PixConfigNotFoundException extends RuntimeException {
    public PixConfigNotFoundException() {
        super("Dados do pix não encontrados");
    }

    public PixConfigNotFoundException(String message) {
        super(message);
    }
}
