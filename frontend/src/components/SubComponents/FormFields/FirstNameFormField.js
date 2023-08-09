import React from "react";

const FirstNameFormField = ({ firstName, setFirstName, userRef }) => {
  return (
    <>
      <label id="firstname" htmlFor="first_name">
        First Name:
      </label>
      <input
        type="text"
        id="first_name"
        ref={userRef}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
    </>
  );
};
export default FirstNameFormField;
