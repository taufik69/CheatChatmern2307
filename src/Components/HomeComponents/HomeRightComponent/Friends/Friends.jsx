import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g2.gif";
import { GetTimeNow } from "../../../../../Utils/Moment/Moment";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment";
import { Friensinfo } from "../../../../Features/Redux/AllSlice/Friendslice";

const Friends = ({ isChatC = false }) => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const auth = getAuth();
  const [FriendList, setFriendList] = useState([]);

  /**
   * todo : Fetch all data from database
   * *DBNAME : "FriendRequest"
   */

  useEffect(() => {
    const FreindsDbRef = ref(db, "Friends/");
    onValue(FreindsDbRef, (snapshot) => {
      let FreindsBlankArr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().whoRecivedFriendRequestUid ||
          auth.currentUser.uid === item.val().whoSendFriendRequestUid
        ) {
          FreindsBlankArr.push({
            ...item.val(),
            FriendKey: item.key,
          });
        }
      });
      setFriendList(FreindsBlankArr);
    });
  }, []);

  /**
   * todo handleBlocked funtion implement
   * @param({item})
   */
  const handleBlocked = (item = {}) => {
    const makeObj = {
      blockbyUid: item.whoRecivedFriendRequestUid,
      blockbyName: item.whoRecivedFriendRequestName,
      blockbyEmail: item.whoRecivedFriendRequestEmail,
      blockbyProfile_picture: item.whoRecivedFriendRequestProfile_picture
        ? item.whoRecivedFriendRequestProfile_picture
        : "",
      blockedUid: item.whoSendFriendRequestUid,
      blockedName: item.whoSendFriendRequestName,
      blockedEmail: item.whoSendFriendRequestEmail,
      blockedProfile_picture: item.whoSendFriendRequestProfilePicture
        ? item.whoSendFriendRequestProfilePicture
        : "",

      FriendRequestKey: item.FriendRequestKey,
    };
    const blockRef = ref(db, "blockedUser/");
    set(push(blockRef), makeObj).then(() => {
      remove(ref(db, "Friends/" + item.FriendKey));
    });
  };

  // handleFriend funtion
  const handleFriend = (item = {}) => {
    if (auth.currentUser.uid === item.whoRecivedFriendRequestUid) {
      dispatch(
        Friensinfo({
          id: item.whoSendFriendRequestUid,
          name: item.whoSendFriendRequestName,
          email: item.whoSendFriendRequestEmail,
          profile_picture: item.whoSendFriendRequestProfilePicture,
        })
      );
    } else {
      dispatch(
        Friensinfo({
          id: item.whoRecivedFriendRequestUid,
          name: item.whoRecivedFriendRequestName,
          email: item.whoRecivedFriendRequestEmail,
          profile_picture: item.whoRecivedFriendRequestProfile_picture,
        })
      );
    }
  };
  return (
    <div
      className={
        isChatC
          ? "px-3 shadow-xl py-2  w-full h-[400px] mt-5 rounded-xl "
          : "px-3 shadow-xl py-2  w-[32%] h-[400px] mt-5 rounded-xl "
      }
    >
      <div className="flex items-center justify-between relative">
        <span className="font-custom_poppins font-semibold text-xl text-black">
          Friends
          <span class="absolute flex h-10 w-10 -top-3 left-[16%]">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative flex justify-center items-center text-white rounded-full h-10 w-10 bg-sky-500 ">
              {FriendList?.length}
            </span>
          </span>
        </span>
        <span className="text-2xl text-primaryBlue">
          <BsThreeDotsVertical />
        </span>
      </div>

      <div className="flex flex-col gap-y-5  h-[85%] mt-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {FriendList?.map((item, index) => (
          <div
            className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-3"
            onClick={() => handleFriend(item)}
          >
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
                {item.whoSendFriendRequestUid === auth.currentUser.uid
                  ? item.whoRecivedFriendRequestName
                  : item.whoSendFriendRequestName}
              </h3>
              <p className="opacity-55 text-md font-noraml font-custom_poppins text-textPrimaryColor">
                {moment(item.createdAt).fromNow()}
              </p>
            </div>

            <div>
              <button
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins"
                onClick={() => handleBlocked(item)}
              >
                Blocked
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
