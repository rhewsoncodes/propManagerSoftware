import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterConfirmEmailField = ({
  confirmEmail,
  setConfirmEmail,
  confirmEmailMatch,
  setConfirmEmailMatch,
  confirmEmailFocus,
  setConfirmEmailFocus,
}) => {
  return (
    <>
      <label htmlFor="confirm_email">
        Confirm Email:
        <FontAwesomeIcon
          icon={faCheck}
          className={confirmEmailMatch && confirmEmail ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={confirmEmailMatch || !confirmEmail ? "hide" : "invalid"}
        />
      </label>

      <input
        type="text"
        id="confirm_email"
        onChange={(e) => setConfirmEmail(e.target.value)}
        required
        aria-invalid={confirmEmailMatch ? "false" : "true"}
        aria-describedby="confirm-email-note"
        onFocus={() => setConfirmEmailFocus(true)}
        onBlur={() => setConfirmEmailFocus(false)}
      />

      <p
        id="confirm-email-note"
        className={
          !confirmEmailFocus && !confirmEmailMatch
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Email must match the first email input field.
      </p>
    </>
  );
};

export default RegisterConfirmEmailField;
