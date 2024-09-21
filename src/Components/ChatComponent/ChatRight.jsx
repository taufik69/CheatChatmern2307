import React from "react";
import avatar from "../../assets/chat/avatar.png";
import { BsThreeDotsVertical } from "react-icons/bs";
const ChatRight = () => {
  return (
    <>
      <div className="flex justify-between items-center border-b-2 border-b-gray-600 pb-5">
        <div className="flex items-center gap-x-[33px]">
          <picture>
            <img src={avatar} alt={avatar} />
          </picture>
          <div className="flex flex-col">
            <h3>Swathi </h3>
            <p>Online</p>
          </div>
        </div>

        <span>
          <BsThreeDotsVertical className="text-blue-800 text-3xl" />
        </span>
      </div>
    </>
  );
};

export default ChatRight;
