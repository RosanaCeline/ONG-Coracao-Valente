package com.coracaovalente.backend.repository;

import com.coracaovalente.backend.model.financial.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findAllByOrderByDateDescIdDesc();
}
