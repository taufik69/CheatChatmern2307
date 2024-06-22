import { toast, Bounce, Zoom } from "react-toastify";
export const SucessToast = (
  msg = "Sucess Message",
  position = "top-right",
  delay = 4000
) => {
  toast(msg, {
    position,
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

/**
 * todo: ErrorToast funtion implement
 * @param {*} msg
 * @param {*} position
 * @param {*} delay
 */
export const ErrorToast = (
  msg = "Error Message",
  position = "top-left",
  delay = 4000
) => {
  toast.error(msg, {
    position,
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

/**
 * todo : Info Toast funtion implement
 * @param {*} msg
 * @param {*} position
 * @param {*} delay
 */

export const InfoToast = (
  msg = "Error Message",
  position = "top-left",
  delay = 4000
) => {
  toast.info(msg, {
    position,
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
};
