import React from "react";

const AccountTypeFormField = ({ accountType, setAccountType }) => {
  return (
    <>
      <label>Account Type:</label>
      <select
        name="accountType"
        onChange={(e) => setAccountType(e.target.value)}
        required
        aria-describedby="sbnote"
      >
        <option value="Owner">Owner</option>
        <option value="Tenant">Tenant</option>
      </select>
    </>
  );
};

export default AccountTypeFormField;
