package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.DonationRequestDTO;
import com.coracaovalente.backend.exception.DonationNotFoundException;
import com.coracaovalente.backend.model.financial.Donation;
import com.coracaovalente.backend.repository.DonationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;

    public List<Donation> getDonations() {
        return donationRepository.findAllByOrderByDateDescIdDesc();
    }

    @Transactional
    public Donation addDonation(DonationRequestDTO request) {
        Donation donation = new Donation();
        donation.setDonor(request.donor());
        donation.setType(request.type());
        donation.setDescription(request.description());
        donation.setValue(request.value());
        donation.setDate(request.date());
        return donationRepository.save(donation);
    }

    @Transactional
    public Donation updateDonation(Long id, DonationRequestDTO request) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(DonationNotFoundException::new);

        donation.setDonor(request.donor());
        donation.setType(request.type());
        donation.setDescription(request.description());
        donation.setValue(request.value());
        donation.setDate(request.date());
        return donationRepository.save(donation);
    }

    @Transactional
    public void deleteDonation(Long id) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(DonationNotFoundException::new);
        donationRepository.delete(donation);
    }
}
