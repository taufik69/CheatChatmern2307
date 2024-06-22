import React from "react";
import LoginRight from "../../Components/Login/LoginRight";
import LoginLeft from "../../Components/Login/LoginLeft";
const Login = () => {
  return (
    <>
      <div className="flex items-center">
        <LoginLeft />
        <LoginRight />
      </div>
    </>
  );
};

export default Login;
