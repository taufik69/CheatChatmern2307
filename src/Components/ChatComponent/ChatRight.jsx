import React, { useEffect, useState } from "react";
import avatar from "../../assets/chat/avatar.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { CiFaceSmile } from "react-icons/ci";
import { FaCameraRetro } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set, onValue } from "firebase/database";

import { GetTimeNow } from "../../../Utils/Moment/Moment";
import ModalComponent from "../CommonCoponents/modalComponent/ModalComponent.jsx";
import { ErrorToast } from "../../../Utils/Toast.js";
import {
  getStorage,
  ref as uploaImagedRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import moment from "moment";
const ChatRight = () => {
  const db = getDatabase();
  const storage = getStorage();
  const auth = getAuth();
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [image, setimage] = useState(null);
  const [progess, setprogress] = useState(null);
  const [downloadURL, setdownloadUrl] = useState("");
  const [allMsg, setallMsg] = useState([]);
  const [sendAutomatic, setsendAutomatic] = useState(false);

  useEffect(() => {
    const fetcher = () => {
      const starCountRef = ref(db, "singleMsg");
      onValue(starCountRef, (snapshot) => {
        let msgBlankArr = [];
        snapshot.forEach((item) => {
          if (
            auth.currentUser.uid === item.val().whoSendMsgUId ||
            auth.currentUser.uid === item.val().whoRecivedMsgUid
          ) {
            msgBlankArr.push({ ...item.val(), msgKey: item.key });
          }
        });
        setallMsg(msgBlankArr);
      });
    };
    fetcher();
  }, []);

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
    if (inputValue?.length > 0) {
      set(push(ref(db, "singleMsg")), {
        whoSendMsgUId: auth.currentUser.uid,
        whoSendMsgName: auth.currentUser.displayName,
        whoSendMsgMail: auth.currentUser.email,
        WhoSendMsgProfilePicture: auth.currentUser.photoURL || "",
        whoRecivedMsgUid: friendsItem.id,
        whoRecivedMsgName: friendsItem.name,
        whoRecivedMsgProfilePicture: friendsItem.profile_picture || "",
        whoRecivedMsgEmail: friendsItem.email,
        msg: inputValue,
        image: downloadURL ? downloadURL : "",
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
    } else if (image || downloadURL) {
      console.log("from else if");
      set(push(ref(db, "singleMsg")), {
        whoSendMsgUId: auth.currentUser.uid,
        whoSendMsgName: auth.currentUser.displayName,
        whoSendMsgMail: auth.currentUser.email,
        WhoSendMsgProfilePicture: auth.currentUser.photoURL || "",
        whoRecivedMsgUid: friendsItem.id,
        whoRecivedMsgName: friendsItem.name,
        whoRecivedMsgProfilePicture: friendsItem.profile_picture || "",
        whoRecivedMsgEmail: friendsItem.email,
        msg: inputValue || "",
        image: downloadURL ? downloadURL : "",
        createdAt: GetTimeNow(),
      })
        .then(() => {
          console.log("image  sent");
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setdownloadUrl("");
          setimage(null);
        });
    } else {
      console.log("from else ");

      return null;
    }
  };

  /**
   * handleuploadImage funtion
   * @params({})
   */

  const handleuploadImage = (event) => {
    setimage(event.target.files[0]);
  };

  const handleSentImage = (event) => {
    if (!image) {
      ErrorToast("Image Must Required !!", "top-center");
    }
    let typeArr = ["image/png", "image/gif", "image/jpeg", "image/webp"];

    // Check if the image type is valid
    if (!typeArr.includes(image.type)) {
      ErrorToast("Image Format can be image/* !!", "top-center");
    }

    const storageRef = uploaImagedRef(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(Math.ceil(progress));
      },
      (error) => {
        console.error("Error from upload image", error);
      },
      () => {
        setprogress(null);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setdownloadUrl(downloadURL);
          setsendAutomatic(true);
        });
        closeModal();
      }
    );
  };

  // handlemessageSend function
  useEffect(() => {
    const caller = () => {
  
      handlemessageSend();
    };

    if ((!downloadURL && !image) || sendAutomatic) {
      caller();
    }
  }, [sendAutomatic]);

  return (
    <>
      <div className="flex justify-between items-center border-b-2 border-b-gray-600 pb-5">
        <div className="flex items-center gap-x-[33px]">
          <picture>
            <img src={friendsItem.profile_picture || avatar} alt={avatar} />
          </picture>
          <div className="flex flex-col capitalize text-2xl">
            <h3>{friendsItem.name || "Swathi"} </h3>
            <p>Online</p>
          </div>
        </div>

        <span>
          <BsThreeDotsVertical className="text-blue-800 text-3xl" />
        </span>
      </div>
      {/* chat page  */}
      <div className="h-[70vh] chatboxImag overflow-y-scroll p-5 ">
        <div className="flex flex-col gap-y-8">
          {allMsg?.map((msg) =>
            auth.currentUser.uid == msg.whoSendMsgUId &&
            friendsItem.id === msg.whoRecivedMsgUid ? (
              msg.image ? (
                <div className="w-[30%] self-end">
                  <div className=" w-full text-center rounded-xl ">
                    <img
                      src={msg.image}
                      alt={msg.image}
                      className="rounded-xl"
                    />
                  </div>
                  <p>{moment(msg.createdAt).fromNow()}</p>
                </div>
              ) : (
                <div className="w-[30%] self-end">
                  <div className="box_Right  w-full  bg-blue-500 py-5 text-center rounded-xl">
                    <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center ">
                      {msg.msg}
                    </h3>
                  </div>
                  <p>{moment(msg.createdAt).fromNow()}</p>
                </div>
              )
            ) : msg.image ? (
              <div className="w-[30%] self-start">
                <div className=" w-full   text-center rounded-xl">
                  <img src={msg.image} alt={msg.image} />
                </div>
                <p>{moment(msg.createdAt).fromNow()}</p>
              </div>
            ) : (
              <div className="w-[30%] self-start">
                <div className="box_left  w-full  bg-blue-500 py-5 text-center rounded-xl">
                  <h3 className="text-white font-custom_poppins font-semibold break-words p-2 text-justify flex justify-center ">
                    {msg.msg}
                  </h3>
                </div>
                <p>{moment(msg.createdAt).fromNow()}</p>
              </div>
            )
          )}
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
          ischatPage={true}
          openModal={openModal}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
        >
          <div className="">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleuploadImage}
                />
              </label>
            </div>

            {progess ? (
              <div class="w-full bg-gray-200 rounded  my-5">
                <div class="w-full bg-gray-200 rounded-full ">
                  <div
                    class="mt-4 w-full  bg-blue-500 text-white rounded px-4 py-2 font-medium   text-center   "
                    style={{ width: `${progess}%` }}
                  >
                    {progess}%
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="mt-4 w-full  bg-blue-500 text-white rounded px-4 py-2"
                onClick={handleSentImage}
              >
                Send
              </button>
            )}
          </div>
        </ModalComponent>
      </div>
    </>
  );
};

export default ChatRight;
