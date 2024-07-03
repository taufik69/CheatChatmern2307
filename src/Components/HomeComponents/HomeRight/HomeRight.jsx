import React from "react";
import Search from "../../CommonCoponents/Search/Search";
import Friends from "../HomeRightComponent/Friends/Friends";
import GroupList from "../HomeRightComponent/GroupList/GroupList";
import UserList from "../HomeRightComponent/UserList/UserList";
const HomeRight = () => {
  return  ( 
  <div className="w-full">
    <Search classname={'w-full py-3 rounded-full pl-14'}/>
    <div className="flex justify-between flex-wrap">
    <GroupList/>
    <Friends/>
    <UserList/>
    <Friends/>
    <UserList/>
    <UserList/>
    </div>
  
  </div>)
 
};

export default HomeRight;
