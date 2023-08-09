import React from "react";

const AddressFormField = ({ address, setAddress }) => {
  return (
    <>
      <label id="addresslabel" htmlFor="address">
        Address:
      </label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
    </>
  );
};

export default AddressFormField;
