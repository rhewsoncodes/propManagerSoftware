import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ManagerHome from "./components/ManagerHome/ManagerHome";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import CreateClientForm from "./components/CreateClientForm/CreateClientForm";
import ClientList from "./components/ClientList/ClientList";

function App() {
  return (
    <Routes>
      <Route path="/" element={Layout.js}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRole="manager" />}>
          <Route path="/" element={<ManagerHome />} />
          <Route path="/create-client" element={<CreateClientForm />} />
          <Route path="/list-clients" element={<ClientList />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
