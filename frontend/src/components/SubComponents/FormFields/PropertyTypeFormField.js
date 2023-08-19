import React from "react";

const PropertyTypeFormField = ({ propertyType, setPropertyType }) => {
  return (
    <>
      <label>Property Type:</label>
      <select
        name="propertyType"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        required
      >
        <option value="1">Apartment</option>
        <option value="2">Townhouse</option>
        <option value="3">Single Family</option>
      </select>
    </>
  );
};

export default PropertyTypeFormField;
