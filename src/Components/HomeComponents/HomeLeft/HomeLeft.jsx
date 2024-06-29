import React, { useState } from "react";
import Avatar from "../../../../src/assets/HomeAssets/HomeLeftAssets/avatar.gif";
import home from "../../../../src/assets/HomeAssets/HomeLeftAssets/home.gif";
import chat from "../../../../src/assets/HomeAssets/HomeLeftAssets/chat.gif";
import bell from "../../../../src/assets/HomeAssets/HomeLeftAssets/bell.gif";
import Settings from "../../../../src/assets/HomeAssets/HomeLeftAssets/settings.png";
import logout from "../../../../src/assets/HomeAssets/HomeLeftAssets/logout.png";
const HomeLeft = () => {
  const [test, settest] = useState("home");
  return (
    <>
      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 w-[186px] rounded-2xl flex flex-col items-center justify-start ">
        <div>
          <picture>
            <img src={Avatar} alt={Avatar} />
          </picture>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-12">
          <div
            className={`${
              test == "home" &&
              "w-full bg-white px-14 rounded-l-xl py-2  iconsShaded cursor-pointer"
            }`}
          >
            <picture>
              <img src={home} alt={home} className="mix-blend-multiply w-10" />
            </picture>
          </div>
          <div
            className={`${
              test == "chat" &&
              "w-full bg-white px-14 rounded-l-xl py-2  iconsShaded cursor-pointer"
            }`}
          >
            <picture>
              <img
                src={chat}
                alt={chat}
                className="mix-blend-multiply w-10 cursor-pointer"
              />
            </picture>
          </div>
          <div
            className={`${
              test == "notification" &&
              "w-full bg-white px-14 rounded-l-xl py-2  iconsShaded "
            }`}
          >
            <picture>
              <img
                src={bell}
                alt={bell}
                className="mix-blend-multiply w-10 cursor-pointer"
              />
            </picture>
          </div>
          <div
            className={`${
              test == "settings" &&
              "w-full bg-white px-14 rounded-l-xl py-2  iconsShaded cursor-pointer"
            }`}
          >
            <picture>
              <img
                src={Settings}
                alt={Settings}
                className="mix-blend-multiply animate-spin w-10 cursor-pointer"
              />
            </picture>
          </div>
        </div>

        <div className="pt-10">
          <picture>
            <img src={logout} alt={logout} className="w-10" />
          </picture>
        </div>
      </div>
    </>
  );
};

export default HomeLeft;
