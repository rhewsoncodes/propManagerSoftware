import React from "react";
import { useRef, useState, useEffect } from "react";
import AccountService from "../../services/AccountService";
import useAuth from "../../hooks/useAuth";
import "./login.css";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

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
      console.log(response);
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      const loggedInUserId = response?.data?.user_id;
      setAuth({ role, accessToken, loggedInUserId });
      console.log("SETTING AUTH WITH ", {
        role,
        accessToken,
        loggedInUserId,
      });
      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Incorrect Username or Password");
      } else {
        setError("Login Failed.");
      }
      errRef.current.focus();
    }
  };
  return (
    <section>
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
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
    </section>
  );
};

export default Login;
