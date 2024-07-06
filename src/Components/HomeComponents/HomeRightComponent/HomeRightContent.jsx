import React from "react";
import GroupList from "./GroupList/GroupList";
import Friends from "./Friends/Friends.jsx";
import UserList from "./UserList/UserList.jsx";
import FrinendRequest from "./FreindRequest/FrinendRequest.jsx";
import MyGroup from "./MyGroup/MyGroup.jsx";
import BlockUser from "./BlockUser/BlockUser.jsx";
import Search from "../../CommonCoponents/Search/Search.jsx";
const HomeRightContent = () => {
  return (
    <div>
      <Search classname={"w-full py-3 rounded-full pl-14"} />
      <div className="flex justify-between flex-wrap">
        <GroupList />
        <Friends />
        <UserList />
        <FrinendRequest />
        <MyGroup />
        <BlockUser />
      </div>
    </div>
  );
};

export default HomeRightContent;
