import React from "react";

const RegisterAccountTypeSelect = ({ accountType, setAccountType }) => {
  return (
    <>
      <label>Account Type:</label>
      <select
        name="accountType"
        onChange={(e) => setAccountType(e.target.value)}
        required
        aria-describedby="sbnote"
      >
        <option value="Manager" aria-describedby="mnote">
          Manager
        </option>
        <optgroup label="Coming soon" aria-describedby="csnote">
          <option value="Owner" aria-describedby="onote" disabled={true}>
            Owner*
          </option>
          <option value="Tenant" aria-describedby="tnote" disabled={true}>
            Tenant*
          </option>
        </optgroup>
      </select>

      <p id="sbnote" className="hide">
        Select account type from available options
      </p>
      <p id="mnote" className="hide">
        Manager
      </p>
      <p id="csnote" className="hide">
        There are 2 options that are coming soon and unavailable
      </p>
      <p id="onote" className="hide">
        Owner option is disabled.
      </p>
      <p id="tnote" className="hide">
        Tenant option is disabled.
      </p>
    </>
  );
};

export default RegisterAccountTypeSelect;
