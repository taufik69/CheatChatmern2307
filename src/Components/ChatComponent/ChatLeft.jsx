import React from "react";
import Search from "../CommonCoponents/Search/Search";
import GroupList from "../HomeComponents/HomeRightComponent/GroupList/GroupList.jsx";
import Friends from "../HomeComponents/HomeRightComponent/Friends/Friends.jsx";
const ChatLeft = () => {
  return (
    <div>
      <Search classname="w-full bg-white rounded-xl py-3 px-10" />
      <GroupList isChatC={true} />
      <Friends isChatC={true} />
    </div>
  );
};

export default ChatLeft;
