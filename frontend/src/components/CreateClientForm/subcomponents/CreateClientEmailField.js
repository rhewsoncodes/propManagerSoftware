import React from "react";
import { useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateClientEmailField = ({
  email,
  setEmail,
  validEmail,
  setValidEmail,
  emailFocus,
  setEmailFocus,
}) => {
  const [emailCross, setEmailCross] = useState(false);
  return (
    <>
      {/*Email input component */}
      <label htmlFor="email">
        Email:
        <FontAwesomeIcon
          icon={faCheck}
          className={validEmail ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={!emailFocus && !validEmail && email ? "invalid" : "hide"}
        />
      </label>
      {/*Because the @ and . are normally towards the end 
      of the email i am not going to harrass them with the 
  X mark until they enter it*/}

      <input
        type="text"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-invalid={validEmail ? "false" : "true"}
        aria-describedby="emailnote"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
      />

      <p
        id="emailnote"
        className={
          !emailFocus && !validEmail && email ? "instructions" : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        This is not a valid email address
      </p>
    </>
  );
};

export default CreateClientEmailField;
