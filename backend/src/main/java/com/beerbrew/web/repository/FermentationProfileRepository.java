package com.beerbrew.web.repository;

import com.beerbrew.web.model.FermentationProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FermentationProfileRepository extends JpaRepository<FermentationProfile, Long> {
}
