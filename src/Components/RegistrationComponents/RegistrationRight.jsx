import React from "react";
import RegistrationRightImage from "../../assets/RegistraionAssets/registration.gif";
const RegistrationRight = () => {
  return (
    <>
      <div className="w-[40%]">
        <picture>
          <img
            src={RegistrationRightImage}
            alt={RegistrationRightImage}
            className="h-screen w-full"
          />
        </picture>
      </div>
    </>
  );
};

export default RegistrationRight;
