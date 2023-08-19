package com.example.propertyService.model.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewPropertyRequest {
    private String ownerId, managerId, address, city, state, zip;
    private int propertyType;
}
