package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.DonationControllerDocs;
import com.coracaovalente.backend.data.dto.request.DonationRequestDTO;
import com.coracaovalente.backend.model.financial.Donation;
import com.coracaovalente.backend.services.DonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donation")
@RequiredArgsConstructor
public class DonationController implements DonationControllerDocs {

    private final DonationService donationService;

    @Override
    @GetMapping
    public ResponseEntity<List<Donation>> getDonations() {
        return ResponseEntity.ok(donationService.getDonations());
    }

    @Override
    @PostMapping
    public ResponseEntity<Donation> addDonation(@RequestBody @Valid DonationRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(donationService.addDonation(request));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<Donation> updateDonation(@PathVariable Long id, @RequestBody @Valid DonationRequestDTO request) {
        return ResponseEntity.ok(donationService.updateDonation(id, request));
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}
