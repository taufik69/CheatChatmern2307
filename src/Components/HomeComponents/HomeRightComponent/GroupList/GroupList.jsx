import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g2.gif";
import ModalComponent from "../../../CommonCoponents/modalComponent/ModalComponent";
const GroupList = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  return (
    <div className="px-3 shadow-xl py-2  w-[32%] h-[400px] mt-5 rounded-xl ">
      <div className="flex items-center justify-between">
        <span className="font-custom_poppins font-semibold text-xl text-black">
          Groups List
        </span>

        <button
          className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins"
          onClick={() => openModal()}
        >
          create Group
        </button>
      </div>

      <div className="flex flex-col gap-y-5  h-[85%] mt-3 overflow-y-scroll scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-transparent">
        {[...new Array(10)].map((_, index) => (
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-300 pb-3">
            <div className="w-[70px] h-[70px] rounded-full shadow-lg">
              <picture>
                <img
                  src={GroupImg}
                  alt={GroupImg}
                  className="w-full h-full rounded-full  object-contain"
                />
              </picture>
            </div>

            <div className="flex flex-col items-center justify-center text-wrap w-[50%]  text-justify">
              <h3 className=" text-lg font-semibold font-custom_poppins text-textPrimaryColor">
                Friends Reunion
              </h3>
              <p className="opacity-55 text-md font-noraml font-custom_poppins text-textPrimaryColor">
                Hi Guys, Wassup!
              </p>
            </div>

            <div>
              <button className="px-5 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl mr-3 text-white font-custom_poppins">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalComponent
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      >
        <div className="w-[80vw] mt-10 overflow-y-scroll">
          <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col items-start gap-y-2">
              <label
                htmlFor="groupName"
                className="text-xl font-custom_poppins"
              >
                groupName <span className="text-red-700">*</span>
              </label>

              <input
                className="py-3 bg-gray-200 border border-red-200 w-full px-2 rounded-lg"
                type="text"
                id="groupName"
                name="groupName"
                value={""}
                placeholder="Enter Your group Name"
              />
            </div>

            <div className="flex flex-col items-start gap-y-2 mt-5">
              <label
                htmlFor="groupTagName"
                className="text-xl font-custom_poppins"
              >
                groupTagName <span className="text-red-700">*</span>
              </label>

              <input
                className="py-3 bg-gray-200 border border-red-200 w-full px-2 rounded-lg"
                type="text"
                id="groupTagName"
                name="groupTagName"
                value={""}
                placeholder="Enter Your group TagName"
              />
            </div>
            {/* == cropper jsx */}
            <div>
              <div className="w-[30%] my-10">
                <input type="file" onChange={onChange} />
              </div>
              <div className="flex justify-between relative">
                <div className="w-[33%] ">
                  <Cropper
                    ref={cropperRef}
                    style={{ height: 365, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                </div>
                <h1 className="bg-green-500 absolute left-[36%] px-10 py-2  text-white -top-[50px]">
                  Preview
                </h1>
                <div className="box w-[32%] bg-blue-500 h-[365px] overflow-hidden">
                  <div className="img-preview w-[100%] h-[365px]" />
                </div>
                <button
                  className="w-40 h-10 absolute left-[62%] bg-red-500 -top-[60px]"
                  onClick={getCropData}
                >
                  Crop Image
                </button>
                <div className="box  w-[32%] bg-red-500 h-[365px]">
                  <img
                    className="w-full h-[365px]"
                    src={cropData}
                    alt="cropped"
                  />
                </div>
              </div>
            </div>
            {/* == cropper jsx */}
          </form>
        </div>
      </ModalComponent>
    </div>
  );
};

export default GroupList;
