import React, { useEffect, useState } from "react";
import HomeRightContent from "../../Components/HomeComponents/HomeRightComponent/HomeRightContent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NotVerified from "../../Components/HomeComponents/HomeRightComponent/NotVerfied/NotVerified";

const Home = () => {
  const auth = getAuth();
  const [isEmailVerified, setisEmailVerified] = useState({
    email: "",
    displayName: "displayName",
    emailVerified: false,
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setisEmailVerified({
        email: user.reloadUserInfo.email,
        displayName: user.reloadUserInfo.displayName,
        emailVerified: user.reloadUserInfo.emailVerified,
      });
      console.log(user.reloadUserInfo.emailVerified);
    });
  }, []);
  return (
    <div>
      {isEmailVerified.emailVerified ? (
        <>
          <HomeRightContent />
        </>
      ) : (
        <NotVerified userInfo={isEmailVerified} />
      )}
    </div>
  );
};

export default Home;
