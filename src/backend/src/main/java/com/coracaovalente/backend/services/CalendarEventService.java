package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.CalendarEventRequestDTO;
import com.coracaovalente.backend.exception.CalendarEventNotFoundException;
import com.coracaovalente.backend.model.calendar.CalendarEvent;
import com.coracaovalente.backend.repository.CalendarEventRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarEventService {

    private final CalendarEventRepository calendarEventRepository;

    public List<CalendarEvent> getEvents() {
        return calendarEventRepository.findAllByOrderByDateAsc();
    }

    @Transactional
    public CalendarEvent addEvent(CalendarEventRequestDTO request) {
        CalendarEvent event = new CalendarEvent();
        event.setTitle(request.title());
        event.setCategory(request.category());
        event.setDate(request.date());
        event.setNotes(request.notes());
        return calendarEventRepository.save(event);
    }

    @Transactional
    public CalendarEvent updateEvent(Long id, CalendarEventRequestDTO request) {
        CalendarEvent event = calendarEventRepository.findById(id)
                .orElseThrow(CalendarEventNotFoundException::new);
        event.setTitle(request.title());
        event.setCategory(request.category());
        event.setDate(request.date());
        event.setNotes(request.notes());
        return calendarEventRepository.save(event);
    }

    @Transactional
    public void deleteEvent(Long id) {
        CalendarEvent event = calendarEventRepository.findById(id)
                .orElseThrow(CalendarEventNotFoundException::new);
        calendarEventRepository.delete(event);
    }
}
