import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from "../AllSlice/Friendslice.js";
export const store = configureStore({
  reducer: {
    friendStore: friendsReducer,
  },
});
