import React from "react";

const CreateClientFirstNameField = ({ firstName, setFirstName, userRef }) => {
  return (
    <>
      <label id="firstname" htmlFor="first_name">
        First Name:
      </label>
      <input
        type="text"
        id="first_name"
        ref={userRef}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </>
  );
};
export default CreateClientFirstNameField;
