import React, { useEffect, useState } from "react";
import Avatar from "../../../../src/assets/HomeAssets/HomeLeftAssets/avatar.gif";
import home from "../../../../src/assets/HomeAssets/HomeLeftAssets/home.gif";
import chat from "../../../../src/assets/HomeAssets/HomeLeftAssets/chat.gif";
import bell from "../../../../src/assets/HomeAssets/HomeLeftAssets/bell.gif";
import Settings from "../../../../src/assets/HomeAssets/HomeLeftAssets/settings.png";
import logout from "../../../../src/assets/HomeAssets/HomeLeftAssets/logout.png";
import { NavLink, useLocation } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { ErrorToast, SucessToast } from "../../../../Utils/Toast";

const HomeLeft = () => {
  const location = useLocation();
  const [userList, setuserList] = useState({});
  const path = location.pathname.split("/")[1];
  const db = getDatabase();
  const auth = getAuth();

  const uploader = Uploader({
    apiKey: "free",
  });
  const options = {
    multi: true,
    editor: {
      images: {
        allowResizeOnMove: true,
        preview: true,
        crop: true,
        cropRatio: 4 / 3,
        cropShape: "circ",
      },
    },
  };
  /**
   * todo : get all users funtion
   * @param ({})
   */
  useEffect(() => {
    const userId = auth.currentUser.uid;
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (userId === item.val().uid) {
          setuserList({
            ...item.val(),
            userKey: item.key,
          });
        }
      });
    });
  }, []);

  // const dbref for profile update
  const profileUpdateRef = ref(db, `users/${userList.userKey}`);

  return (
    <>
      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 w-[224px] rounded-2xl flex flex-col items-center justify-start ">
        <div className="relative shadowProfile">
          <picture>
            <img
              src={
                userList.usersProfile_picture
                  ? userList.usersProfile_picture
                  : Avatar
              }
              alt={Avatar}
              className=" object-cover rounded-full w-[100px] h-[100px] my-12  "
            />
          </picture>

          <div className="absolute top-[50%] left-[32%] cursor-pointer z-10 icons">
            <span>
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) =>
                  update(profileUpdateRef, {
                    usersProfile_picture: files[0].fileUrl,
                  })
                    .then(() =>
                      SucessToast("Profile Update done", "top-center")
                    )
                    .catch((err) => {
                      ErrorToast(`${err.code}`);
                    })
                }
              >
                {({ onClick }) => (
                  <button onClick={onClick}>
                    <IoCloudUploadOutline className="text-4xl  text-white" />
                  </button>
                )}
              </UploadButton>
            </span>
          </div>
        </div>

        <h1 className="mb-10 text-white font-semibold font-custom_poppins  text-[25px] uppercase">
          {auth.currentUser.displayName}
        </h1>
        <div className="flex flex-col justify-center items-center gap-y-12">
          <NavLink to="/">
            <div
              className={`${
                path == "" &&
                "w-full bg-white px-14 rounded-l-xl py-2  iconsShaded cursor-pointer"
              }`}
            >
              <picture>
                <img
                  src={home}
                  alt={home}
                  className="mix-blend-multiply w-10"
                />
              </picture>
            </div>
          </NavLink>
          <NavLink to={"/chat"}>
            <div
              className={`${
                path == "chat" &&
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
          </NavLink>
          <NavLink to={"/notification"}>
            <div
              className={`${
                path == "notification" &&
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
          </NavLink>
          <NavLink to={"/settings"}>
            <div
              className={`${
                path == "settings" &&
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
          </NavLink>
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
