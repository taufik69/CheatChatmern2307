import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decremnet,
  incremnetbyamount,
  reset,
} from "../../Features/Redux/AllSlice/slice";
const Notification = () => {
  const { mern2306 } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDe = () => {
    dispatch(decremnet());
  };

  const incremt4 = () => {
    dispatch(incremnetbyamount(40));
  };
  return (
    <div className="flex items-center justify-center flex-col w-full gap-y-4">
      <p className="text-2xl">{mern2306.value}</p>
      <div className="flex gap-x-5">
        <button className="px-4 py-2 bg-blue-600" onClick={handleIncrement}>
          Increment
        </button>
        <button className="px-4 py-2 bg-blue-600" onClick={handleDe}>
          decremnet
        </button>

        <button className="px-4 py-2 bg-blue-600" onClick={incremt4}>
          incrementby4
        </button>

        <button
          className="px-4 py-2 bg-blue-600"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Notification;
