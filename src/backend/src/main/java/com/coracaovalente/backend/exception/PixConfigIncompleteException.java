package com.coracaovalente.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class PixConfigIncompleteException extends RuntimeException {
    public PixConfigIncompleteException() {
        super("O administrador ainda não configurou os dados do Pix. Tente novamente mais tarde.");
    }

    public PixConfigIncompleteException(String message) {
        super(message);
    }
}
