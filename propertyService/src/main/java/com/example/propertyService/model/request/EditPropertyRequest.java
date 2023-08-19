package com.example.propertyService.model.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditPropertyRequest {
    String propertyId, address, city, usState, zipcode;
    int propertyType;
}
