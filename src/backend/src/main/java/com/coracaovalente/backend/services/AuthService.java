package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.AuthRequestDTO;
import com.coracaovalente.backend.data.dto.response.TokenResponseDTO;
import com.coracaovalente.backend.exception.InvalidPasswordException;
import com.coracaovalente.backend.exception.UserAlreadyRegisteredException;
import com.coracaovalente.backend.model.user.User;
import com.coracaovalente.backend.model.user.UserRole;
import com.coracaovalente.backend.repository.UserRepository;
import com.coracaovalente.backend.security.jwt.TokenService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final TokenService tokenService;

    public TokenResponseDTO login(AuthRequestDTO request) {
        try {
            var auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );

            String token = tokenService.generateToken((User) auth.getPrincipal());

            return new TokenResponseDTO(token);
        } catch (BadCredentialsException e) {
            throw new InvalidPasswordException();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public User register(AuthRequestDTO request) {
        if (this.userRepository.findByEmail(request.email()) != null) throw new UserAlreadyRegisteredException();

        String encryptedPassword = new BCryptPasswordEncoder().encode(request.password());
        User newUser = new User(request.email(), encryptedPassword, UserRole.USER);

        return userRepository.save(newUser);
    }
}
