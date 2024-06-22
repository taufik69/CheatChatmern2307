import React from "react";
import login from "../../assets/loginAssets/login.gif";
const LoginRight = () => {
  return (
    <>
      <div className="w-[40%]">
        <picture>
          <img src={login} alt={login} className="h-screen w-full" />
        </picture>
      </div>
    </>
  );
};

export default LoginRight;
