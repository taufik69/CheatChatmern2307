import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g3.gif";
const BlockUser = () => {
  return (
    <div className="px-3 shadow-xl py-2  w-[32%] h-[400px] mt-5 rounded-xl ">
      <div className="flex items-center justify-between">
        <span className="font-custom_poppins font-semibold text-xl text-black">
          Blocked Users
        </span>
        <span className="text-2xl text-primaryBlue">
          <BsThreeDotsVertical />
        </span>
      </div>

      <div className="flex flex-col gap-y-5  h-[85%] mt-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {[...new Array(10)].map((_, index) => (
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-3">
            <div className="w-[70px] h-[70px] rounded-full shadow-lg">
              <picture>
                <img
                  src={GroupImg}
                  alt={GroupImg}
                  className="w-full h-full rounded-full  object-contain"
                />
              </picture>
            </div>

            <div className="flex flex-col items-center justify-center text-wrap w-[50%]  text-justify">
              <h3 className=" text-lg font-semibold font-custom_poppins text-textPrimaryColor">
                Friends Reunion
              </h3>
              <p className="opacity-55 text-md font-noraml font-custom_poppins text-textPrimaryColor">
                Hi Guys, Wassup!
              </p>
            </div>

            <div>
              <button className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins">
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockUser;
