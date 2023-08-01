import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../services/AccountService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginRequest = {
      username,
      password,
    };
    console.log(loginRequest);
    AccountService.post("auth/authenticate", JSON.stringify(loginRequest)).then(
      (response) => {
        console.log(response);
        navigate("/");
      },
      (error) => {
        console.log(error);
        switch (error.response.status) {
          case 403:
            setError("Incorrect username or password");
            break;
          default:
            break;
        }
      }
    );
  };
  return (
    <div className="account-form">
      <h2>Please log in</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPending && <button>Log in</button>}
        {isPending && <button disabled>Logging in</button>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
