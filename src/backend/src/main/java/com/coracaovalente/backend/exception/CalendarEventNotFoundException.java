package com.coracaovalente.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CalendarEventNotFoundException extends RuntimeException {
    public CalendarEventNotFoundException() {
        super("Evento de calendário não encontrado");
    }
}
