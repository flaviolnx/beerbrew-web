package com.beerbrew.web.repository;

import com.beerbrew.web.model.WaterProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WaterProfileRepository extends JpaRepository<WaterProfile, Long> {
}
