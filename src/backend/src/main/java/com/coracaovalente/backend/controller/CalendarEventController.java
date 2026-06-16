package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.CalendarEventControllerDocs;
import com.coracaovalente.backend.data.dto.request.CalendarEventRequestDTO;
import com.coracaovalente.backend.model.calendar.CalendarEvent;
import com.coracaovalente.backend.services.CalendarEventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
public class CalendarEventController implements CalendarEventControllerDocs {

    private final CalendarEventService calendarEventService;

    @Override
    @GetMapping
    public ResponseEntity<List<CalendarEvent>> getEvents() {
        return ResponseEntity.ok(calendarEventService.getEvents());
    }

    @Override
    @PostMapping
    public ResponseEntity<CalendarEvent> addEvent(@RequestBody @Valid CalendarEventRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(calendarEventService.addEvent(request));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<CalendarEvent> updateEvent(
            @PathVariable Long id,
            @RequestBody @Valid CalendarEventRequestDTO request) {
        return ResponseEntity.ok(calendarEventService.updateEvent(id, request));
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        calendarEventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}
