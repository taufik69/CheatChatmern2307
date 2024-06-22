import React, { useEffect, useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
const LoginLeft = () => {
  const [eyeopen, seteyeopen] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });
  /**
   * todo : handleLogininput
   */
  const handleLoginInput = (e) => {
    setloginInfo({
      ...loginInfo,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <div className="w-[60%] h-screen">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col gap-y-10">
            <div>
              <h1 className="text-[32px] font-semibold text-auth_primary_Color font-Custom_nunito">
                Login to your account!
              </h1>
            </div>
            <div className="border-[1px] border-gray-200 py-6 rounded-xl px-4 cursor-pointer">
              <button className="flex items-center gap-x-3 text-[18px] font-semibold text-auth_primary_Color font-Custom_nunito">
                <FcGoogle className="text-3xl" /> Login With Google
              </button>
            </div>

            <div className="flex flex-col gap-y-8">
              <div>
                <fieldset className="border-2 px-4 rounded-md">
                  <legend className="font-Custom_nunito font-normal text-[14px] px-4 text-auth_primary_Color">
                    Email
                  </legend>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleLoginInput}
                    className="py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                    placeholder="Ladushing691@gmail.com"
                  />
                </fieldset>
                <span className="text-red-500 text-sm font-normal font-Custom_nunito">
                  {/* {emailErrror} */}
                </span>
              </div>

              <div>
                <fieldset className="border-2 px-4 rounded-md">
                  <legend className="font-Custom_nunito font-normal text-[14px] px-4 text-auth_primary_Color">
                    password
                  </legend>

                  <div className="flex items-center justify-between">
                    <input
                      type={eyeopen ? "text" : "password"}
                      name="password"
                      id="password"
                      onChange={handleLoginInput}
                      className=" py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                      placeholder="...."
                    />
                    <span
                      className="cursor-pointer"
                      onClick={() => seteyeopen(!eyeopen)}
                    >
                      {eyeopen ? <IoEyeOffSharp /> : <IoEyeSharp />}
                    </span>
                  </div>
                </fieldset>
              </div>
              <div className="cursor-pointer">
                <button className="w-full rounded-full py-5 bg-gradient-to-r from-[#614385] to-[#516395] text-xl text-white">
                  Sign in
                </button>
              </div>
              <div className="flex justify-center">
                <p className="font-Custom_nunito font-normal text-[14px] text-auth_primary_Color ">
                  Don’t have an account
                  <span className="text-[#EA6C00] ml-2 hover:underline">
                    Sign In
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginLeft;
