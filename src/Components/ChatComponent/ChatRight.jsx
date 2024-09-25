import React, { useState } from "react";
import avatar from "../../assets/chat/avatar.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { CiFaceSmile } from "react-icons/ci";
import { FaCameraRetro } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
const ChatRight = () => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [inputValue, setinputValue] = useState("");

  const handleEmoji = (argu) => {
    console.log(argu.emoji);
    setinputValue((prevstate) => {
      return prevstate + argu.emoji;
    });
  };

  const handlemsgInput = (event) => {
    const { value } = event.target;
    setinputValue(value);
  };

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
      {/* chat page  */}
      <div className="h-[70vh] bg-gray-200 overflow-y-scroll p-5">
        <div className="flex flex-col gap-y-8">
          <div className="w-[30%] self-start">
            <div className="box_left  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center z-10">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-end">
            <div className="box_Right  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center z-10">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-end">
            <div className="box_Right  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center z-10">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-start">
            <div className="box_left  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center z-10">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-start">
            <div className="box_left  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center z-10">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>
        </div>
      </div>
      {/* chat page  */}

      <div className="w-full flex gap-x-6 py-4">
        <div className="w-[89%] relative">
          <input
            type="text"
            id="message"
            name="message"
            className="w-full bg-gray-300 py-5 rounded-xl pl-5 "
            placeholder="Write Your Message ...."
            onChange={handlemsgInput}
            value={inputValue}
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-40">
            <div className="flex gap-x-6">
              <span>
                <CiFaceSmile
                  className="text-blue-800  text-2xl cursor-pointer"
                  onClick={() => setshowEmojiPicker(!showEmojiPicker)}
                />
                {showEmojiPicker && (
                  <div className="absolute right-1/3 bottom-[178%] z-50">
                    <EmojiPicker onEmojiClick={handleEmoji} />
                  </div>
                )}
              </span>
              <span>
                <FaCameraRetro className="text-blue-800  text-2xl cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
        <button className="px-4 mx-2 bg-blue-700 rounded-lg text-white text-2xl">
          <IoIosSend />
        </button>
      </div>
    </>
  );
};

export default ChatRight;
