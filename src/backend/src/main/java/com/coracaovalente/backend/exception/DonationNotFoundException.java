package com.coracaovalente.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DonationNotFoundException extends RuntimeException {
    public DonationNotFoundException() {
        super("Doação não encontrada");
    }
}
