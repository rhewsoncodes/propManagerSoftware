package com.example.propertyService.repository;

import com.example.propertyService.model.Property;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

@Transactional
public interface PropertyRepository extends JpaRepository<Property, UUID> {
    Optional<Property[]> getAllByManagerId(String managerId);
    Optional<Property> getPropertyByUuid(UUID uuid);
    void deletePropertyByUuid(UUID uuid);
}
