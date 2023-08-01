import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterUsernameField = ({
  username,
  setUsername,
  validUsername,
  setValidUsername,
  usernameFocus,
  setUsernameFocus,
  userRef,
}) => {
  return (
    <>
      {/* Username input component */}
      <label htmlFor="username">
        Username:
        <FontAwesomeIcon
          icon={faCheck}
          className={validUsername ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validUsername || !username ? "hide" : "invalid"}
        />
      </label>

      <input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setUsername(e.target.value)}
        required
        aria-invalid={validUsername ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() => setUsernameFocus(true)}
        onBlur={() => setUsernameFocus(false)}
      />

      <p
        id="uidnote"
        className={
          usernameFocus && username && !validUsername
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        6 to 24 characters. <br />
        The username must begin with a letter.
        <br />
        Letters, numbers, underscore, and hyphens are allowed.
      </p>
    </>
  );
};

export default RegisterUsernameField;
