import React from "react";
import useAuthentication from "../services/useAuthentication";

const TestPage = () => {
  const [loginResponse, login] = useAuthentication();

  const userCredentials = {
    user_name: 1001,
    password: "iv321#",
    isReadyToAuthenticate: true,
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={login(userCredentials)}>
        Login
      </button>
      <p>{JSON.stringify(loginResponse)}</p>
    </div>
  );
};

export default TestPage;
