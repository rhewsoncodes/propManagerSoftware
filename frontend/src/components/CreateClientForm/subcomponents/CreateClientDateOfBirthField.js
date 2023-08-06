import React from "react";

const CreateClientDateOfBirthField = ({ dob, setDob }) => {
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

export default CreateClientDateOfBirthField;
