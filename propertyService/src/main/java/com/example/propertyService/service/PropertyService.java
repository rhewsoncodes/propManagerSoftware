package com.example.propertyService.service;

import com.example.propertyService.model.Property;
import com.example.propertyService.model.request.EditPropertyRequest;
import com.example.propertyService.model.request.NewPropertyRequest;
import com.example.propertyService.repository.PropertyRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class PropertyService {

    @Autowired
    PropertyRepository propertyRepository;

    public ResponseEntity<String> addProperty(NewPropertyRequest request) {
        try {
            Property newProperty = Property.builder()
                    .ownerId(request.getOwnerId())
                    .managerId(request.getManagerId())
                    .address(request.getAddress())
                    .city(request.getCity())
                    .state(request.getState())
                    .zip(request.getZip())
                    .propertyType(request.getPropertyType())
                    .build();

            propertyRepository.save(newProperty);

            return ResponseEntity.ok("New Property Added");

        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    public ResponseEntity<Property[]> getPropertiesByManager(String managerId) {
        try{
            Optional<Property[]> properties = propertyRepository.getAllByManagerId(managerId);
            if(properties.isPresent()){
                return ResponseEntity.ok(properties.get());
            } else {
                return ResponseEntity.ok(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<Property> getPropertyById(String propertyId) {
        try{
            UUID propertyUUID = UUID.fromString(propertyId);
            Optional<Property> property = propertyRepository.getPropertyByUuid(propertyUUID);
            if (property.isPresent()){
                return ResponseEntity.ok(property.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<String> deletePropertyById(String propertyId) {
        try{
            UUID propertyUUID = UUID.fromString(propertyId);
            Optional<Property> property = propertyRepository.getPropertyByUuid(propertyUUID);
            if (property.isEmpty()) {
                return ResponseEntity.ok("No property with that ID to delete");
            }
            propertyRepository.deletePropertyByUuid(propertyUUID);
            return ResponseEntity.ok("Property deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<String> editProperty(EditPropertyRequest request) {
        try {
            UUID propertyUUID = UUID.fromString(request.getPropertyId());
            Optional<Property> propertyOptional = propertyRepository.getPropertyByUuid(propertyUUID);
            if (propertyOptional.isEmpty()){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            Property property = propertyOptional.get();
            property.setAddress(request.getAddress());
            property.setCity(request.getCity());
            property.setState(request.getUsState());
            property.setZip(request.getZipcode());
            property.setPropertyType(request.getPropertyType());
            propertyRepository.save(property);
            return ResponseEntity.ok("Changes saved");
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
