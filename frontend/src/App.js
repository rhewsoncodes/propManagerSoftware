import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ManagerHome from "./components/ManagerHome/ManagerHome";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Unauthorized from "./components/Unauthorized";
import CreateClientForm from "./components/CreateClientForm/CreateClientForm";
import ClientList from "./components/ClientList/ClientList";
import AddProperty from "./components/AddProperty/AddProperty";
import EditClientForm from "./components/EditClientForm/EditClientForm";
import PropertyList from "./components/PropertyList/PropertyList";
import EditPropertyForm from "./components/EditPropertyForm/EditPropertyForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={Layout.js}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole="Manager" />}>
            <Route path="/" element={<ManagerHome />} />
            <Route path="/create-client" element={<CreateClientForm />} />
            <Route
              path="/list-owners"
              element={<ClientList type={"owners"} />}
            />
            <Route
              path="/list-tenants"
              element={<ClientList type={"tenants"} />}
            />
            <Route
              path="/add-property"
              element={<AddProperty type={"owners"} />}
            />
            <Route
              exact
              path="/edit-client/:clientId"
              element={<EditClientForm />}
            />
            <Route path="/property-list" element={<PropertyList />} />
            <Route
              exact
              path="/edit-property/:propertyId"
              element={<EditPropertyForm />}
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
