package com.coracaovalente.backend.services;

import com.coracaovalente.backend.exception.UserNotFoundException;
import com.coracaovalente.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UserNotFoundException {
        UserDetails user = userRepository.findByEmail(email);

        if (user == null) throw new UserNotFoundException();
        return user;
    }
}
