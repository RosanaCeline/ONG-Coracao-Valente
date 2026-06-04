package com.coracaovalente.backend.exception;

public class TagNotFoundException extends RuntimeException {
    public TagNotFoundException() {
        super("Tag não encontrada");
    }

    public TagNotFoundException(String message) {
        super(message);
    }
}
