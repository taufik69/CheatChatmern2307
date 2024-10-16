import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "60%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    zIndex: 4000,
  },
};

const ModalComponent = ({
  openModal,
  closeModal,
  modalIsOpen,
  children,
  ischatPage = false,
}) => {
  return (
    <div className="cameraModal">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          className={
            ischatPage
              ? "w-16 h-16 rounded-full bg-red-600 text-white text-3xl flex justify-center items-center mb-10 "
              : "w-16 h-16 rounded-full bg-red-600 text-white text-3xl flex justify-center items-center"
          }
        >
          x
        </button>
        <div>{children}</div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
