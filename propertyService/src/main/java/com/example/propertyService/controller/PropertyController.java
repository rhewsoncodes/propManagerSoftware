package com.example.propertyService.controller;


import com.example.propertyService.model.Property;
import com.example.propertyService.model.request.EditPropertyRequest;
import com.example.propertyService.model.request.NewPropertyRequest;
import com.example.propertyService.service.PropertyService;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/property")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping("/addProperty")
    public ResponseEntity<String> addNewProperty(@RequestBody NewPropertyRequest request){
        return propertyService.addProperty(request);
    }

    @GetMapping("/properties/{managerId}")
    public ResponseEntity<Property[]> getPropertiesByManagerId(@PathVariable("managerId") String managerId){
        return propertyService.getPropertiesByManager(managerId);
    }

    @PutMapping("/edit-property")
    public ResponseEntity<String> editProperty(@RequestBody EditPropertyRequest request){
        return propertyService.editProperty(request);
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<Property> getPropertyByID(@PathVariable("propertyId")String propertyId){
        return propertyService.getPropertyById(propertyId);
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<String> deletePropertyById(@PathVariable("propertyId") String propertyId){
        return propertyService.deletePropertyById(propertyId);
    }
}
