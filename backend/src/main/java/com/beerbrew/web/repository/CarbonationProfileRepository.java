package com.beerbrew.web.repository;

import com.beerbrew.web.model.CarbonationProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarbonationProfileRepository extends JpaRepository<CarbonationProfile, Long> {
}
