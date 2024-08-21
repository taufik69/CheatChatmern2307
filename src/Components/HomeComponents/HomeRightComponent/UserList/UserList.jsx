import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g1.gif";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import moment from "moment";
import { getAuth } from "firebase/auth";
import { GetTimeNow } from "../../../../../Utils/Moment/Moment";
const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [users, setusers] = useState([]);
  const [isFriendRequest, setisFriendRequest] = useState([]);
  /**
   * todo : Fetch all data from database
   * *DBNAME : "users"
   */

  useEffect(() => {
    const userDbRef = ref(db, "users/");
    onValue(userDbRef, (snapshot) => {
      let userBlankArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid !== item.val().uid) {
          userBlankArr.push({
            ...item.val(),
            userKey: item.key,
          });
        }
      });
      setusers(userBlankArr);
    });
  }, []);

  /**
   * todo : handleFriendRequest function implement
   * @param({user})
   *
   */

  const handleFriendRequest = (user) => {
    const FriendRequestRef = ref(db, "FriendRequest/");
    set(push(FriendRequestRef), {
      whoSendFriendRequestName: auth.currentUser.displayName,
      whoSendFriendRequestEmail: auth.currentUser.email,
      whoSendFriendRequestUid: auth.currentUser.uid,
      whoSendFriendRequestProfilePicture: auth.currentUser.photoURL
        ? auth.currentUser.photoURL
        : null,
      whoRecivedFriendRequestUid: user.uid,
      whoRecivedFriendRequestName: user.userName,
      whoRecivedFriendRequestEmail: user.userEmail,
      whoRecivedFriendRequestUserKey: user.userKey,
      whoRecivedFriendRequestProfile_picture: user.usersProfile_picture,
      createdAt: GetTimeNow(),
    });
  };

  /**
   * todo : Fetch data from friendRequest databasd
   * @param({})
   * *hooks useEffect()
   */

  useEffect(() => {
    const friendRequestDbRef = ref(db, "FriendRequest/");
    onValue(friendRequestDbRef, (snapshot) => {
      let blackFriendRequestList = [];
      snapshot.forEach((item) => {
        blackFriendRequestList.push(
          item.val().whoRecivedFriendRequestUid +
            item.val().whoSendFriendRequestUid
        );
      });
      setisFriendRequest(blackFriendRequestList);
    });
  }, []);

  return (
    <div className="px-3 shadow-xl py-2  w-[32%] h-[400px] mt-5 rounded-xl ">
      <div className="flex items-center justify-between relative">
        <span className="font-custom_poppins font-semibold text-xl text-black">
          User List
          <span class="absolute flex h-10 w-10 -top-3 left-[16%]">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span class="relative flex justify-center items-center text-white rounded-full h-10 w-10 bg-sky-500 ">
              {users?.length}
            </span>
          </span>
        </span>

        <span className="text-2xl text-primaryBlue">
          <BsThreeDotsVertical />
        </span>
      </div>

      <div className="flex flex-col gap-y-5  h-[85%] mt-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {users.map((user) => (
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-3">
            <div className="w-[70px] h-[70px] rounded-full shadow-lg">
              <picture>
                <img
                  src={`${
                    user.usersProfile_picture
                      ? user.usersProfile_picture
                      : GroupImg
                  }`}
                  alt={"GroupImg Missing"}
                  className="w-full h-full rounded-full  object-contain"
                />
              </picture>
            </div>

            <div className="flex flex-col items-center justify-center text-wrap w-[50%]  text-justify">
              <h3 className=" text-lg font-semibold font-custom_poppins text-textPrimaryColor">
                {user.userName ? user.userName : "Name Xyz"}
              </h3>
              <p className="opacity-55 text-md font-noraml font-custom_poppins text-textPrimaryColor">
                {moment(user.createdAt).calendar()}
              </p>
            </div>

            <div>
              {isFriendRequest.includes(
                user.uid + auth.currentUser.uid ||
                  auth.currentUser.uid + user.uid
              ) ? (
                <button className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins">
                  -
                </button>
              ) : (
                <button
                  onClick={() => handleFriendRequest(user)}
                  className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins"
                >
                  +
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
