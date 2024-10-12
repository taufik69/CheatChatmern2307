import React, { useState } from "react";
import avatar from "../../assets/chat/avatar.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { CiFaceSmile } from "react-icons/ci";
import { FaCameraRetro } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set } from "firebase/database";
import { GetTimeNow } from "../../../Utils/Moment/Moment";
import ModalComponent from "../CommonCoponents/modalComponent/ModalComponent.jsx";

const ChatRight = () => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const db = getDatabase();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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

  const { friendsItem } = useSelector((state) => state.friendStore);

  const handlemessageSend = () => {
    if (inputValue) {
      set(push(ref(db, "singleMsg/")), {
        msg: inputValue,
        createdAt: GetTimeNow(),
      })
        .then(() => {
          console.log("message sent");
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setinputValue("");
        });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border-b-2 border-b-gray-600 pb-5">
        <div className="flex items-center gap-x-[33px]">
          <picture>
            <img
              src={friendsItem.whoSendFriendRequestProfilePicture || avatar}
              alt={avatar}
            />
          </picture>
          <div className="flex flex-col capitalize text-2xl">
            <h3>{friendsItem.whoSendFriendRequestName || "Swathi"} </h3>
            <p>Online</p>
          </div>
        </div>

        <span>
          <BsThreeDotsVertical className="text-blue-800 text-3xl" />
        </span>
      </div>
      {/* chat page  */}
      <div className="h-[70vh] bg-gray-200 overflow-y-scroll p-5 ">
        <div className="flex flex-col gap-y-8">
          <div className="w-[30%] self-start">
            <div className="box_left  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center ">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-end">
            <div className="box_Right  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center ">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-end">
            <div className="box_Right  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center ">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-start">
            <div className="box_left  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center ">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>

          <div className="w-[30%] self-start">
            <div className="box_left  w-full  bg-blue-500 py-5 text-center rounded-xl">
              <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center ">
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
              <span onClick={() => openModal()}>
                <FaCameraRetro className="text-blue-800  text-2xl cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
        <button
          className="px-4 mx-2 bg-blue-700 rounded-lg text-white text-2xl"
          onClick={handlemessageSend}
        >
          <IoIosSend />
        </button>
      </div>
      <div>
        <ModalComponent
          openModal={openModal}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
        >
          <div className="z-50">
            <div class="flex items-center justify-center w-full ">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>

            <button> Send </button>
          </div>
        </ModalComponent>
      </div>
    </>
  );
};

export default ChatRight;
