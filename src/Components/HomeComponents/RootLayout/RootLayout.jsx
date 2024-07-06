import React from "react";
import HomeLeft from "../HomeLeft/HomeLeft";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <>
      <div className="bg-blue-100 h-screen p-5 flex gap-x-10 ">
        <HomeLeft />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
