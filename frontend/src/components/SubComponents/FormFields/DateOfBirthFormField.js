import React from "react";
import { useEffect } from "react";

const DateOfBirthFormField = ({ dob, setDob }) => {
  return (
    <>
      <label for="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        min="1900-01-01"
        onChange={(e) => setDob(e.target.value)}
      />
    </>
  );
};

export default DateOfBirthFormField;
