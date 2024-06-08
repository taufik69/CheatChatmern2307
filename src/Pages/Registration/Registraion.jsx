import React from "react";
import RegistrationLeft from "../../Components/RegistrationComponents/RegistrationLeft";
import RegistrationRight from "../../Components/RegistrationComponents/RegistrationRight";

const Registraion = () => {
  return (
    <>
      <div className="flex justify-between items-center h-screen">
        <RegistrationLeft />
        <RegistrationRight />
      </div>
    </>
  );
};

export default Registraion;
