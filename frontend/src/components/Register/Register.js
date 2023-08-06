import AccountService from "../../services/AccountService";

import { useRef, useState, useEffect } from "react";

import RegisterConfirmPasswordField from "./subcomponents/RegisterConfirmPasswordField";
import RegisterPasswordField from "./subcomponents/RegisterPasswordField";
import RegisterUsernameField from "./subcomponents/RegisterUsernameField";
import EmailField from "./subcomponents/RegisterEmailField";
import RegisterConfirmEmailField from "./subcomponents/RegisterConfirmEmailField";
import RegisterFirstNameField from "./subcomponents/RegisterFirstNameField";
import RegisterLastNameField from "./subcomponents/RegisterLastNameField";
import "./register.css";

/*
Username is of length 6-23 and contains
only 

*/

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_].{4,23}$/;

/*
Password is of length 8-24 and contains 
- 1 lowercase letter
- 1 uppercase letter
- 1 number

the password also only contains special characters !@#$%
*/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%].{7,23}/;

/*
Makes sure email has a @ and that there is no funky stuff in there that shouldnt be
*/

const EMAIL_REGEX = /(?=.*@)(?=.*\.)[a-zA-Z0-9@.]{3,}/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  //States for username field
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  //States for password field
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  //States for confirm password field
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  //States for email field
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //States for confirm email field
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmEmailMatch, setConfirmEmailMatch] = useState(false);
  const [confirmEmailFocus, setConfirmEmailFocus] = useState(false);

  //Statefor first name
  const [firstName, setFirstName] = useState("");
  //States for last name
  const [lastName, setLastName] = useState("");

  //States for error field
  const [error, setError] = useState(null);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //Makes sure users know whether or not what they are typing into the username field is valid
  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  //Makes sure users know whether password is valid and password and confirmpassword match
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setConfirmPasswordMatch(match);
  }, [password, confirmPassword]);

  //Makes sure users know whether email is valid and email and confirmemail match
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    const match = email === confirmEmail;
    setConfirmEmailMatch(match);
  }, [email, confirmEmail]);

  useEffect(() => {
    setError("");
  }, [
    username,
    password,
    confirmPassword,
    email,
    confirmEmail,
    firstName,
    lastName,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      /*Completely un-necessary double check of regex to show people we arent screwing around. */
    }
    const userRegCheck = USER_REGEX.test(username);
    const passRegCheck = PWD_REGEX.test(password);
    const emailRegCheck = EMAIL_REGEX.test(email);

    if (!userRegCheck || !passRegCheck || !emailRegCheck) {
      setError("Invalid Entry");
      return;
    }

    const createAccountRequest = {
      username,
      password,
      email,
      firstName,
      lastName,
      accountType: "Manager",
    };
    try {
      const response = await AccountService.post(
        "auth/createAccount",
        JSON.stringify(createAccountRequest)
      );
      console.log(response);
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setConfirmEmail("");
      setFirstName("");
      setLastName("");
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
        <h1>Register Account</h1>

        <form onSubmit={handleSubmit}>
          <RegisterUsernameField
            username={username}
            setUsername={setUsername}
            validUsername={validUsername}
            setValidUsername={setValidUsername}
            usernameFocus={usernameFocus}
            setUsernameFocus={setUsernameFocus}
            userRef={userRef}
          />
          <RegisterPasswordField
            password={password}
            setPassword={setPassword}
            validPassword={validPassword}
            setValidPassword={setValidPassword}
            passwordFocus={passwordFocus}
            setPasswordFocus={setPasswordFocus}
          />
          <RegisterConfirmPasswordField
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            confirmPasswordMatch={confirmPasswordMatch}
            setConfirmPasswordMatch={setConfirmPasswordMatch}
            confirmPasswordFocus={confirmPasswordFocus}
            setConfirmPasswordFocus={setConfirmPasswordFocus}
          />
          <EmailField
            email={email}
            setEmail={setEmail}
            validEmail={validEmail}
            setValidEmail={setValidEmail}
            emailFocus={emailFocus}
            setEmailFocus={setEmailFocus}
          />
          <RegisterConfirmEmailField
            confirmEmail={confirmEmail}
            setConfirmEmail={setConfirmEmail}
            confirmEmailMatch={confirmEmailMatch}
            setConfirmEmailMatch={setConfirmEmailMatch}
            confirmEmailFocus={confirmEmailFocus}
            setConfirmEmailFocus={setConfirmEmailFocus}
          />
          <RegisterFirstNameField
            firstName={firstName}
            setFirstName={setFirstName}
          />
          <RegisterLastNameField
            lastName={lastName}
            setLastName={setLastName}
          />

          <button
            disabled={
              !validUsername ||
              !validPassword ||
              !confirmPasswordMatch ||
              !validEmail ||
              !confirmEmailMatch ||
              !firstName ||
              !lastName
                ? true
                : false
            }
          >
            Sign up
          </button>
        </form>
      </section>
    </>
  );
};

export default Register;
