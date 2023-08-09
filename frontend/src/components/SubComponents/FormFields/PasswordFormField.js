import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordFormField = ({
  password,
  setPassword,
  validPassword,
  setValidPassword,
  passwordFocus,
  setPasswordFocus,
}) => {
  return (
    <>
      <label htmlFor="password">
        Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={validPassword ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={validPassword || !password ? "hide" : "invalid"}
        />
      </label>

      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        required
        aria-invalid={validPassword ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
      />

      <p
        id="pwdnote"
        className={
          passwordFocus && !validPassword ? "instructions" : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        8 to 24 characters. <br />
        Must include an uppercase and a <br />
        lowercase letters and a number.
        <br />
        Allowed special characters:
        <span aria-label="exclamation mark">!</span>
        <span aria-label="at symbol">@</span>
        <span aria-label="hastag">#</span>
        <span aria-label="dollar sign">$</span>
        <span aria-label="percent">%</span>
      </p>
    </>
  );
};

export default PasswordFormField;
