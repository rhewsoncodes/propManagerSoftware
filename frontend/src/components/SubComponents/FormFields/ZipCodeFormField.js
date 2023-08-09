import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ZipCodeFormField = ({
  zipcode,
  setZipcode,
  zipcodeValid,
  setZipcodeValid,
  zipcodeFocus,
  setZipcodeFocus,
}) => {
  return (
    <>
      <label id="zipcodelabel" htmlFor="zipcode">
        Zip Code:
        <FontAwesomeIcon
          icon={faCheck}
          className={zipcodeValid ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={
            !zipcodeFocus && !zipcodeValid && zipcode ? "invalid" : "hide"
          }
        />
      </label>
      <input
        type="text"
        id="zipcode"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        required
        onFocus={() => setZipcodeFocus(true)}
        onBlur={() => setZipcodeFocus(false)}
      />
      <p
        id="emailnote"
        className={
          !zipcodeFocus && !zipcodeValid && zipcode
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        This is not a valid zip code.
      </p>
    </>
  );
};

export default ZipCodeFormField;
