import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g3.gif";
import { getAuth } from "firebase/auth";
import { GetTimeNow } from "../../../../../Utils/Moment/Moment";

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const BlockUser = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [BlockUserList, setBlockUserList] = useState([]);

  /**
   * todo : Fetch all data from database
   * *DBNAME : "FriendRequest"
   */

  useEffect(() => {
    const blockDbRef = ref(db, "blockedUser/");
    onValue(blockDbRef, (snapshot) => {
      let blockBlankArr = [];
      snapshot.forEach((item) => {
        if (1) {
          blockBlankArr.push({
            ...item.val(),
            BlockKey: item.key,
          });
        }
      });
      setBlockUserList(blockBlankArr);
    });
  }, []);

  /**
   * todo : handleUnblock function implement
   * @param {} item
   */
  const handleUnblock = (item = {}) => {
    const unblockObj = {
      FriendRequestKey: item.FriendRequestKey,
      createdAt: GetTimeNow(),
      whoRecivedFriendRequestEmail: item.blockbyEmail,
      whoRecivedFriendRequestName: item.blockbyName,
      whoRecivedFriendRequestProfile_picture: item.blockbyProfile_picture,
      whoRecivedFriendRequestUid: item.blockbyUid,
      whoSendFriendRequestEmail: item.blockedEmail,
      whoSendFriendRequestName: item.blockedName,
      whoSendFriendRequestEmail: item.blockedEmail,
      whoSendFriendRequestUid: item.blockedUid,
      whoSendFriendRequestProfilePicture: item.blockedProfile_picture
        ? item.blockedProfile_picture
        : "",
    };
    const FreindsRef = ref(db, "Friends/");
    set(push(FreindsRef), unblockObj).then(() => {
      remove(ref(db, "blockedUser/" + item.BlockKey));
    });
  };
  return (
    <div className="px-3 shadow-xl py-2  w-[32%] h-[400px] mt-5 rounded-xl ">
      <div className="flex items-center justify-between relative">
        <span className="font-custom_poppins font-semibold text-xl text-black">
          Blocked
          <span class="absolute flex h-10 w-10 -top-3 left-[16%]">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative flex justify-center items-center text-white rounded-full h-10 w-10 bg-sky-500 ">
              {0}
            </span>
          </span>
        </span>
        <span className="text-2xl text-primaryBlue">
          <BsThreeDotsVertical />
        </span>
      </div>

      <div className="flex flex-col gap-y-5  h-[85%] mt-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {BlockUserList?.map((item, index) => (
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-3">
            <div className="w-[70px] h-[70px] rounded-full shadow-lg">
              <picture>
                <img
                  src={
                    item.blockedProfile_picture
                      ? item.blockedProfile_picture
                      : GroupImg
                  }
                  alt={
                    item.blockedProfile_picture
                      ? item.blockedProfile_picture
                      : GroupImg
                  }
                  className="w-full h-full rounded-full  object-contain"
                />
              </picture>
            </div>

            <div className="flex flex-col items-center justify-center text-wrap w-[50%]  text-justify">
              <h3 className=" text-lg font-semibold font-custom_poppins text-textPrimaryColor">
                {item.blockedName ? item.blockedName : "MERN 2307"}
              </h3>
              <p className="opacity-55 text-md font-noraml font-custom_poppins text-textPrimaryColor">
                {item.blockedEmail ? item.blockedEmail : "xyz"}
              </p>
            </div>

            <div>
              <button
                className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins"
                onClick={() => handleUnblock(item)}
              >
                UnBlocked
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockUser;
