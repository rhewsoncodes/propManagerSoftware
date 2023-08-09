import React, { useEffect, useState, useRef } from "react";

import "./createClientForm.css";

import useAuth from "../../hooks/useAuth";
import useAccountServicePrivate from "../../hooks/useAccountServicePrivate";
import { useNavigate } from "react-router-dom";
import FirstNameFormField from "../SubComponents/FormFields/FirstNameFormField";
import LastNameFormField from "../SubComponents/FormFields/LastNameFormField";
import EmailFormField from "../SubComponents/FormFields/EmailFormField";
import ConfirmEmailFormField from "../SubComponents/FormFields/ConfirmEmailFormField";
import DateOfBirthFormField from "../SubComponents/FormFields/DateOfBirthFormField";
import AccountTypeFormField from "../SubComponents/FormFields/AccountTypeFormField";
import PhoneNumberField from "../SubComponents/FormFields/PhoneNumberField";

const CreateClientForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const { auth } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmEmailMatch, setConfirmEmailMatch] = useState(false);
  const [confirmEmailFocus, setConfirmEmailFocus] = useState(false);

  const [dob, setDob] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [accountType, setAccountType] = useState("Owner");

  const AccountServicePrivate = useAccountServicePrivate();

  const EMAIL_REGEX = /(?=.*@)(?=.*\.)[a-zA-Z0-9@.]{3,}/;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    const match = email === confirmEmail;
    setConfirmEmailMatch(match);
  }, [email, confirmEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegCheck = EMAIL_REGEX.test(email);
    if (!emailRegCheck) {
      setError("Invalid Entry");
      return;
    }
    const managerId = auth.loggedInUserId;
    const createClientAccountRequest = {
      firstName,
      lastName,
      email,
      dob,
      phoneNumber,
      accountType,
      managerId,
    };
    try {
      const response = await AccountServicePrivate.post(
        "client/create-client",
        createClientAccountRequest
      );
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 409) {
        setError("Username or Email taken");
      } else {
        setError("Registration failed.");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={error ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {error}
        </p>
        <h1>Create Client Account</h1>
        <form onSubmit={handleSubmit}>
          <FirstNameFormField
            firstName={firstName}
            setFirstName={setFirstName}
            userRef={userRef}
          />
          <LastNameFormField lastName={lastName} setLastName={setLastName} />
          <EmailFormField
            email={email}
            setEmail={setEmail}
            validEmail={validEmail}
            setValidEmail={setValidEmail}
            emailFocus={emailFocus}
            setEmailFocus={setEmailFocus}
          />
          <ConfirmEmailFormField
            confirmEmail={confirmEmail}
            setConfirmEmail={setConfirmEmail}
            confirmEmailMatch={confirmEmailMatch}
            setConfirmEmailMatch={setConfirmEmailMatch}
            confirmEmailFocus={confirmEmailFocus}
            setConfirmEmailFocus={setConfirmEmailFocus}
          />
          <DateOfBirthFormField dob={dob} setDob={setDob} />
          <PhoneNumberField
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          <AccountTypeFormField
            accountType={accountType}
            setAccountType={setAccountType}
          />
          <button>Submit</button>
        </form>
      </section>
    </>
  );
};

export default CreateClientForm;
