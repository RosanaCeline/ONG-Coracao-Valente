package com.coracaovalente.backend.controller.docs;

import com.coracaovalente.backend.config.SecurityConfig;
import com.coracaovalente.backend.data.dto.request.CalendarEventRequestDTO;
import com.coracaovalente.backend.model.calendar.CalendarEvent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Calendário", description = "Gestão de lembretes e eventos do calendário da ONG")
public interface CalendarEventControllerDocs {

    @Operation(summary = "Lista todos os eventos ordenados por data")
    @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<List<CalendarEvent>> getEvents();

    @Operation(summary = "Cria um novo evento no calendário")
    @ApiResponse(responseCode = "201", description = "Evento criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<CalendarEvent> addEvent(CalendarEventRequestDTO request);

    @Operation(summary = "Edita um evento existente")
    @ApiResponse(responseCode = "200", description = "Evento atualizado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content)
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Evento não encontrado", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<CalendarEvent> updateEvent(Long id, CalendarEventRequestDTO request);

    @Operation(summary = "Remove um evento do calendário")
    @ApiResponse(responseCode = "204", description = "Evento removido com sucesso")
    @ApiResponse(responseCode = "401", description = "Requisição não autorizada", content = @Content)
    @ApiResponse(responseCode = "404", description = "Evento não encontrado", content = @Content)
    @SecurityRequirement(name = SecurityConfig.SECURITY)
    ResponseEntity<Void> deleteEvent(Long id);
}
