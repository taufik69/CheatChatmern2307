import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import BeatLoader from "react-spinners/BeatLoader.js";
import { GetTimeNow } from "../../../Utils/Moment/Moment.js";
import { ErrorToast, SucessToast } from "../../../Utils/Toast.js";
import {
  EmailValidator,
  PasswordValidator,
  fullNameValidator,
} from "../../../Utils/Validation.js";

const RegistrationLeft = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [fullname, setfullname] = useState("");
  const [password, setpassword] = useState("");
  const [eyeopen, seteyeopen] = useState(false);
  const [loading, setloading] = useState(false);

  //for error
  const [emailErrror, setemailErrror] = useState("");
  const [fullnameError, setfullnameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  let [color, setColor] = useState("#ffffff");

  /**
   * todo : handleEmail funtion implement
   * @param({event})
   */

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  /**
   * todo : handleFullname funtion implement
   * @param({event})
   */

  const handleFullName = (event) => {
    setfullname(event.target.value);
  };

  /**
   * todo : handlepassword funtion implement
   * @param({event})
   */
  const handlepassword = (event) => {
    setpassword(event.target.value);
  };

  /*
  todo : handle eye funtion */
  const handleEye = () => {
    seteyeopen(!eyeopen);
  };

  /**
   * todo : handleSubmit
   *
   */

  const handleSubmit = () => {
    if (!email || !EmailValidator(email)) {
      setemailErrror("Email missing or Wrong mail🌋");
    } else if (!fullname || !fullNameValidator(fullname)) {
      setemailErrror("");
      setfullnameError("FullName missing or character in 20 words 🌋");
    } else if (!password || !PasswordValidator(password)) {
      setfullnameError("");
      setpasswordError(
        "password missing password contains a more than 10 chracter and speacial character 🌋"
      );
    } else {
      setpasswordError("");
      setloading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          SucessToast(`${fullname} Resgistraion Done`, "top-right");
        })
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            SucessToast(`${fullname} please Check your Email`, "top-center");
          });
        })
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: fullname,
          });
        }).then(()=> {
          const usersRef = ref(db, "users/") 
          set(push(usersRef)  , {
            uid:auth.currentUser.uid,
            userName: fullname,
            userEmail: auth.currentUser.email,
            createdAt:GetTimeNow()
          }).then(()=> {
            console.log("Write data on users collection");
            navigate("/login")
          }).catch((err)=> {
            console.error("User Database Write failed" ,err)
          })
        })
        .catch((err) => {
          
          // let ourError = err.message.split("/")[1];
          // ErrorToast(ourError.slice(0, ourError.length - 2), "top-left");
          ErrorToast("err.code", "top-left");
        })
        .finally(() => {
          setpasswordError("");
          setfullnameError("");
          setemailErrror("");
          setpassword("");
          setfullname("");
          setEmail("");
          setloading(false);
        });
    }
  };


  

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
              <div>
                <fieldset className="border-2 px-4 rounded-md">
                  <legend className="font-Custom_nunito font-normal text-[14px] px-4 text-auth_primary_Color">
                    Email
                  </legend>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                    className="py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                    placeholder="Ladushing691@gmail.com"
                  />
                </fieldset>
                <span className="text-red-500 text-sm font-normal font-Custom_nunito">
                  {emailErrror}
                </span>
              </div>
              <div>
                <fieldset className="border-2 px-4 rounded-md">
                  <legend className="font-Custom_nunito font-normal text-[14px] px-4 text-auth_primary_Color">
                    Full Name
                  </legend>

                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={fullname}
                    onChange={handleFullName}
                    className=" py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                    placeholder="Ladushing691@gmail.com"
                  />
                </fieldset>
                <span className="mt-2 text-red-500 text-sm font-normal font-Custom_nunito">
                  {fullnameError}
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
                      onChange={handlepassword}
                      id="password"
                      value={password}
                      className=" py-3 rounded-md pl-2 placeholder:font-Custom_nunito"
                      placeholder="...."
                    />
                    <span className="cursor-pointer" onClick={handleEye}>
                      {eyeopen ? <IoEyeOffSharp /> : <IoEyeSharp />}
                    </span>
                  </div>
                </fieldset>
                <span className="mt-2 text-red-500 text-sm font-normal font-Custom_nunito">
                  {`${passwordError && passwordError.slice(0, 50) + "..."}`}
                </span>
              </div>
              <div className="cursor-pointer" onClick={handleSubmit}>
                <button className="w-full rounded-full py-5 bg-gradient-to-r from-[#614385] to-[#516395] text-xl text-white">
                  {loading ? (
                    <BeatLoader
                      color={color}
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                <p>
                  Already have an account ?{" "}
                  <Link to ={"/login"}>
                  <span className="text-[#EA6C00]">Sign In</span>
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

export default RegistrationLeft;
