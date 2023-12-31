import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>
        You do not have access to this page, if you believe this is in error
        contact us.
      </p>
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
};

export default Unauthorized;
