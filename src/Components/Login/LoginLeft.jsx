import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ErrorToast, SucessToast } from "../../../Utils/Toast.js";

import {
  EmailValidator,
  PasswordValidator,
} from "../../../Utils/Validation.js";
const LoginLeft = () => {
  const auth = getAuth();

  const [eyeopen, seteyeopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  // all error state
  const [loginError, setloginError] = useState({
    emailError: "",
    passwordError: "",
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

  /**
   * todo : handleSignIn funtion implement
   * @parms({})
   */

  const handleSignIn = () => {
    const { email, password } = loginInfo;
    if (!email || !EmailValidator(email)) {
      setloginError({
        ...loginError,
        emailError: "Your Email Wrong !!",
      });
    } else if (!password || !PasswordValidator(password)) {
      setloginError({
        ...loginError,
        emailError: "",
        passwordError: "Your password is  Wrong  !!",
      });
    } else {
      setloading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          SucessToast(`login Sucessfull`, "bottom-left");
        })
        .catch((err) => {
          ErrorToast(`${err.code}`, "bottom-right");
        })
        .finally(() => {
          setloading(false);
          setloginError({
            ...loginError,
            emailError: "",
            passwordError: "",
          });
        });
    }
  };

  /**
   * todo : HandleLoginWithGoogle funciton implement
   * @param ({})
   */
  const HandleLoginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
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
            <div
              onClick={HandleLoginWithGoogle}
              className="border-[1px] border-gray-200 py-6 rounded-xl px-4 cursor-pointer"
            >
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
                  {loginError.emailError}
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
                <span className="text-red-500 text-sm font-normal font-Custom_nunito">
                  {loginError.passwordError}
                </span>
              </div>
              {loading ? (
                <div className="cursor-pointer">
                  <button className="w-full rounded-full bg-gradient-to-r from-[#614385] to-[#516395] text-xl text-white">
                    <span className="flex justify-center items-center">
                      <DNA
                        visible={true}
                        height="40"
                        width="60"
                        ariaLabel="dna-loading"
                      />
                    </span>
                  </button>
                </div>
              ) : (
                <div className="cursor-pointer" onClick={handleSignIn}>
                  <button className="w-full rounded-full py-3 bg-gradient-to-r from-[#614385] to-[#516395] text-xl text-white">
                    Sign in
                  </button>
                </div>
              )}

              <div className="flex justify-center">
                <p className="font-Custom_nunito font-normal text-[14px] text-auth_primary_Color ">
                  Don’t have an account
                  <Link to="/registration">
                    <span className="text-[#EA6C00] ml-2 hover:underline">
                      Sign Up
                    </span>
                  </Link>
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
