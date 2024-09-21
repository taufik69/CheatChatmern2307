import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g2.gif";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
const MyGroup = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [allgroup, setallgroup] = useState([]);
  const [allgroupRequest, setallgroupRequest] = useState([]);
  useEffect(() => {
    const groupInfoFetcher = () => {
      const starCountRef = ref(db, "group/");
      onValue(starCountRef, (snapshot) => {
        let groupBlankArr = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid == item.val().whoCreateGroupUId) {
            groupBlankArr.push({ ...item.val(), groupKey: item.key });
          }
        });
        setallgroup(groupBlankArr);
      });
    };
    const getAllGroupRequest = () => {
      const starCountRef = ref(db, "groupJoinRequest/");
      onValue(starCountRef, (snapshot) => {
        let groupJoinRequestArr = [];
        snapshot.forEach((item) => {
          groupJoinRequestArr.push(
            groupJoinRequestArr.push(item.val().groupKey)
          );
        });
        setallgroupRequest(groupJoinRequestArr);
      });
    };
    groupInfoFetcher();

    getAllGroupRequest();
  }, []);

  console.log(allgroupRequest);

  return (
    <div className="px-3 shadow-xl py-2  w-[32%] h-[400px] mt-5 rounded-xl ">
      <div className="flex items-center justify-between relative">
        <span className="font-custom_poppins font-semibold text-xl text-black">
          My Groups
          <span class="absolute flex h-10 w-10 -top-3 left-[16%]">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative flex justify-center items-center text-white rounded-full h-10 w-10 bg-sky-500 ">
              {allgroup?.length}
            </span>
          </span>
        </span>
        <span className="text-2xl text-primaryBlue">
          <BsThreeDotsVertical />
        </span>
      </div>

      <div className="flex flex-col gap-y-5  h-[85%] mt-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {allgroup?.map((item) => (
          <div
            className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-3"
            key={item.groupKey}
          >
            <div className="w-[70px] h-[70px] rounded-full shadow-lg">
              <picture>
                <img
                  src={item ? item.groupImage : GroupImg}
                  alt={item ? item.groupImage : GroupImg}
                  className="w-full h-full rounded-full  object-contain"
                />
              </picture>
            </div>

            <div className="flex flex-col items-center justify-center text-wrap w-[50%]  text-justify">
              <h3 className=" text-lg font-semibold font-custom_poppins text-textPrimaryColor">
                {item ? item.groupName : "mern 2307"}
              </h3>
              <p className="opacity-55 text-md font-noraml font-custom_poppins text-textPrimaryColor">
                {item ? item.groupTagName : "Hello"}
              </p>
            </div>

            <div>
              {allgroupRequest.includes(item.groupKey) ? (
                <div className="flex gap-x-4">
                  <button className="bg-blue-500 py-2 px-4 rounded-lg text-white font-Custom_nunito font-semibold">
                    Aceept
                  </button>
                  <button className="bg-red-500 py-2 px-4 rounded-lg font-custom_poppins font-semibold text-white">
                    Reject
                  </button>
                </div>
              ) : (
                <span className="font-custom_poppins text-textPrimaryColor opacity-50 text-sm">
                  Today, 8:56pm
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGroup;
