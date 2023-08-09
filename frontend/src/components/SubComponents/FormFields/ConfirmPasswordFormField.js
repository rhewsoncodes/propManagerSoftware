import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmPasswordFormField = ({
  confirmPassword,
  setConfirmPassword,
  confirmPasswordMatch,
  setConfirmPasswordMatch,
  confirmPasswordFocus,
  setConfirmPasswordFocus,
}) => {
  return (
    <>
      <label htmlFor="confirm_password">
        Confirm Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={confirmPasswordMatch && confirmPassword ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={
            confirmPasswordMatch || !confirmPassword ? "hide" : "invalid"
          }
        />
      </label>

      <input
        type="password"
        id="confirm_password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        aria-invalid={confirmPasswordMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() => setConfirmPasswordFocus(true)}
        onBlur={() => setConfirmPasswordFocus(false)}
      />

      <p
        id="confirmnote"
        className={
          confirmPasswordFocus && !confirmPasswordMatch
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the first password input field.
      </p>
    </>
  );
};

export default ConfirmPasswordFormField;
