package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.OngConfigRequestDTO;
import com.coracaovalente.backend.exception.OngConfigNotFoundException;
import com.coracaovalente.backend.model.ong.OngConfig;
import com.coracaovalente.backend.repository.OngConfigRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OngConfigService {

    private final OngConfigRepository ongConfigRepository;

    public OngConfig getOngConfig() {
        return ongConfigRepository.findById(1L)
                .orElseThrow(OngConfigNotFoundException::new);
    }

    @Transactional
    public OngConfig updateOngConfig(OngConfigRequestDTO request) {
        OngConfig config = ongConfigRepository.findById(1L)
                .orElse(new OngConfig());

        config.setId(1L);
        config.setName(request.name());
        config.setCnpj(request.cnpj());
        config.setResponsibleName(request.responsibleName());
        config.setAddress(request.address());
        config.setNumber(request.number());
        config.setNeighborhood(request.neighborhood());
        config.setCity(request.city());
        config.setState(request.state());
        config.setCep(request.cep());
        config.setVolunteers(request.volunteers());
        config.setWhatsappNumber(request.whatsappNumber());
        config.setInstagramUrl(request.instagramUrl());
        config.setInstagramHandle(request.instagramHandle());
        config.setLogoUrl(request.logoUrl());

        return ongConfigRepository.save(config);
    }
}
