package com.beerbrew.web.repository;

import com.beerbrew.web.model.BrewNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrewNoteRepository extends JpaRepository<BrewNote, Long> {
}
