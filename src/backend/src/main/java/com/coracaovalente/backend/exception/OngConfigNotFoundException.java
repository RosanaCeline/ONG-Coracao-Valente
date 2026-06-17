package com.coracaovalente.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OngConfigNotFoundException extends RuntimeException {
    public OngConfigNotFoundException() {
        super("Configurações da ONG não encontradas");
    }
}
