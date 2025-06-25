package org.example.repositories;

import org.example.entities.VendaItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaItemRepository extends JpaRepository<VendaItem, Long> {
}
