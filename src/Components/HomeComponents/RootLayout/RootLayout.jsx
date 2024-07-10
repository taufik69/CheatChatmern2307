import React, { useEffect, useState } from "react";
import HomeLeft from "../HomeLeft/HomeLeft";
import { Outlet } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const RootLayout = () => {
  const auth = getAuth();
  const [isEmailVerified, setisEmailVerified] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setisEmailVerified(user.reloadUserInfo.emailVerified);
      console.log(user.reloadUserInfo.emailVerified);
    });
  }, [auth]);
  return (
    <>
      <div className="bg-blue-100 h-screen p-5 flex gap-x-10 ">
        {isEmailVerified && <HomeLeft />}

        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
