import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAccountServicePrivate from "../../hooks/useAccountServicePrivate";
import FirstNameFormField from "../SubComponents/FormFields/FirstNameFormField";
import LastNameFormField from "../SubComponents/FormFields/LastNameFormField";
import EmailFormField from "../SubComponents/FormFields/EmailFormField";
import ConfirmEmailFormField from "../SubComponents/FormFields/ConfirmEmailFormField";
import PhoneNumberField from "../SubComponents/FormFields/PhoneNumberField";

const EditClientForm = ({ type }) => {
  const [clientData, sendClientData] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmEmailMatch, setConfirmEmailMatch] = useState(false);
  const [confirmEmailFocus, setConfirmEmailFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [accountType, setAccountType] = useState("");

  const [error, setError] = useState(null);

  const { clientId } = useParams();

  const navigate = useNavigate();

  const accountServicePrivate = useAccountServicePrivate();

  const EMAIL_REGEX = /(?=.*@)(?=.*\.)[a-zA-Z0-9@.]{3,}/;

  const errRef = useRef();

  const grabData = async () => {
    try {
      const response = await accountServicePrivate.get(
        `client/get-client/${clientId}`
      );
      console.log(response);
      const data = response.data;
      console.log(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setAccountType(data.accountType);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    grabData();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    const match = email === confirmEmail;
    setConfirmEmailMatch(match);
  }, [email, confirmEmail]);

  const handleSubmit = () => {
    try {
      const editClientRequest = {
        clientId,
        email,
        firstName,
        lastName,
        phoneNumber,
      };
      const response = accountServicePrivate.patch(
        "client/edit-client",
        editClientRequest
      );
      console.log(response);
      if (accountType === "Owner") {
        navigate("/list-owners");
      } else {
        navigate("/list-tenants");
      }
    } catch (err) {
      setError(err);
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
        <h1>Edit {type} Details</h1>
        <form onSubmit={handleSubmit}>
          <FirstNameFormField
            firstName={firstName}
            setFirstName={setFirstName}
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
          <PhoneNumberField
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          <button>Submit</button>
        </form>
      </section>
    </>
  );
};

export default EditClientForm;
