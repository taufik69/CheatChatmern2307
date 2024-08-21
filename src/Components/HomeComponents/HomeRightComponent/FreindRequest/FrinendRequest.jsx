import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g2.gif";
import { GetTimeNow } from "../../../../../Utils/Moment/Moment";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment/moment";
const FrinendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [FriendRequestList, setFriendRequestList] = useState([]);

  /**
   * todo : Fetch all data from database
   * *DBNAME : "FriendRequest"
   */

  useEffect(() => {
    const FriendRequestDbRef = ref(db, "FriendRequest/");
    onValue(FriendRequestDbRef, (snapshot) => {
      let FriendRequestBlankArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().whoRecivedFriendRequestUid) {
          FriendRequestBlankArr.push({
            ...item.val(),
            FriendRequestKey: item.key,
          });
        }
      });
      setFriendRequestList(FriendRequestBlankArr);
    });
  }, []);

  /**
   * todo : rejectFreindRequest funtion implement
   * @param ({item})
   */

  const rejectFreindRequest = (item = {}) => {
    const friendRequestRef = ref(db, "FriendRequest/" + item?.FriendRequestKey);
    remove(friendRequestRef);
  };

  /**
   * todo :acceptFriendRequest funtion implement
   * @param ({item})
   */
  const acceptFriendRequest = (item = {}) => {
    const FreindRef = ref(db, "Friends/");
    set(push(FreindRef), {
      ...item,
      createdAt: GetTimeNow(),
      whoRecivedFriendRequestUserKey: null,
    }).then(() => {
      const friendRequestRef = ref(
        db,
        "FriendRequest/" + item?.FriendRequestKey
      );
      remove(friendRequestRef);
    });
  };

  return (
    <div className="px-3 shadow-xl py-2  w-[32%] h-[400px] mt-5 rounded-xl ">
      <div className="flex items-center justify-between relative">
        <span className="font-custom_poppins font-semibold text-xl text-black">
          User List
          <span class="absolute flex h-10 w-10 -top-3 left-[16%]">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative flex justify-center items-center text-white rounded-full h-10 w-10 bg-sky-500 ">
              {FriendRequestList?.length}
            </span>
          </span>
        </span>
        <span className="text-2xl text-primaryBlue">
          <BsThreeDotsVertical />
        </span>
      </div>

      <div className="flex flex-col gap-y-5  h-[85%] mt-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {FriendRequestList?.map((item, index) => (
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-3">
            <div className="w-[70px] h-[70px] rounded-full shadow-lg">
              <picture>
                <img
                  src={
                    item.whoSendFriendRequestProfilePicture
                      ? item.whoSendFriendRequestProfilePicture
                      : GroupImg
                  }
                  alt={
                    item.whoSendFriendRequestProfilePicture
                      ? item.whoSendFriendRequestProfilePicture
                      : GroupImg
                  }
                  className="w-full h-full rounded-full  object-contain"
                />
              </picture>
            </div>

            <div className="flex flex-col items-center justify-center text-wrap w-[50%]  text-justify">
              <h3 className="capitalize text-lg font-semibold font-custom_poppins text-textPrimaryColor">
                {item.whoSendFriendRequestName
                  ? item.whoSendFriendRequestName
                  : "MERN 2307"}
              </h3>
              <p className="opacity-55 text-md font-noraml font-custom_poppins text-textPrimaryColor">
                {moment(item.createdAt).fromNow()}
              </p>
            </div>

            <div className="flex">
              <button
                className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins"
                onClick={() => acceptFriendRequest(item)}
              >
                Accept
              </button>
              <button
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins"
                onClick={() => {
                  rejectFreindRequest(item);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrinendRequest;
