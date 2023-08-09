import React from "react";

const PhoneNumberField = ({ phoneNumber, setPhoneNumber }) => {
  return (
    <>
      <label id="phonenumber" htmlFor="phonenumber">
        Phone Number:
      </label>
      <input
        type="tel"
        id="phonenumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
    </>
  );
};

export default PhoneNumberField;
