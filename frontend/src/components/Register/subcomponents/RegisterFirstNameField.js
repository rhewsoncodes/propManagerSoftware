import { text } from "@fortawesome/fontawesome-svg-core";
import React from "react";

const RegisterFirstNameField = ({ firstName, setFirstName }) => {
  return (
    <>
      <label id="firstname" htmlFor="first_name">
        First Name:
      </label>
      <input
        type="text"
        id="firstname"
        onChange={(e) => setFirstName(e.target.value)}
        required
        aria-invalid={firstName ? "false" : "true"}
        aria-describedby="firstname"
      />
    </>
  );
};

export default RegisterFirstNameField;
