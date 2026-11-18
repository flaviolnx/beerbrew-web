package com.beerbrew.web.repository;

import com.beerbrew.web.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
}
