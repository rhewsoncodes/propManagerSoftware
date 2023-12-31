import React from "react";

const LastNameFormField = ({ lastName, setLastName }) => {
  return (
    <>
      <label id="lastname" htmlFor="last_name">
        Last Name:
      </label>
      <input
        type="text"
        id="last_name"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        required
        aria-invalid={lastName ? "false" : "true"}
        aria-describedby="lastname"
      />
    </>
  );
};

export default LastNameFormField;
