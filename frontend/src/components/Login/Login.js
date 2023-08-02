import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import AccountService from "../../services/AccountService";
import "./login.css";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [username, password]);

  useEffect(() => {
    setError("");
  }, [success]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const signInRequest = { username, password };
      const response = await AccountService.post(
        "auth/authenticate",
        signInRequest,
        {
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      setUsername("");
      setPassword("");
      setSuccess(true);
      console.log(response);
      console.log(response?.data);
      console.log(response?.data?.token);
      console.log(JSON.stringify(response));
    } catch (err) {
      setError(err);
    }
  };
  return (
    <loginsection>
      <p
        ref={errRef}
        className={error ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {error}
      </p>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Log in</button>
      </form>
    </loginsection>
  );
};

export default Login;
