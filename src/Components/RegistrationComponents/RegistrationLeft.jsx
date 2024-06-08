import React from "react";

const RegistrationLeft = () => {
  return (
    <>
      <div className="w-[60%] h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col gap-y-10">
            <div>
              <h1 className="text-[32px] font-semibold text-auth_primary_Color font-Custom_nunito">
                Get started with easily register
              </h1>
              <p className="text-xl font-Custom_nunito font-normal text-auth_secondary_color">
                Free register and you can enjoy it
              </p>
            </div>

            <div className="flex flex-col gap-y-8">
              <fieldset className="border-2 px-4 rounded-md">
                <legend className="font-Custom_nunito font-normal text-[14px] px-4 text-auth_primary_Color">
                  Email
                </legend>

                <input
                  type="eamil"
                  name="eamil"
                  id="eamil"
                  className=" py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                  placeholder="Ladushing691@gmail.com"
                />
              </fieldset>
              <fieldset className="border-2 px-4 rounded-md">
                <legend className="font-Custom_nunito font-normal text-[14px] px-4 text-auth_primary_Color">
                  Full Name
                </legend>

                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className=" py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                  placeholder="Ladushing691@gmail.com"
                />
              </fieldset>

              <fieldset className="border-2 px-4 rounded-md">
                <legend className="font-Custom_nunito font-normal text-[14px] px-4 text-auth_primary_Color">
                  password
                </legend>

                <input
                  type="password"
                  name="password"
                  id="password"
                  className=" py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                  placeholder="...."
                />
              </fieldset>
              <div>
                <button className="w-full rounded-full py-5 bg-gradient-to-r from-[#614385] to-[#516395] text-xl text-white">
                  Sign up
                </button>
              </div>
              <div className="flex justify-center">
                <p>
                  Already have an account ?{" "}
                  <span className="text-[#EA6C00]">Sign In</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationLeft;
