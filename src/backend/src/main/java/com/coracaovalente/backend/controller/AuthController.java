package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.data.dto.request.LoginRequestDTO;
import com.coracaovalente.backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    public ResponseEntity<> login(@RequestBody @Valid LoginRequestDTO request) {
        return null;
    }

    public ResponseEntity<> resetPassword() {
        return null;
    }
}
