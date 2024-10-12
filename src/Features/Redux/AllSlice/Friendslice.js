import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsItem: {},
};

export const FriendSlice = createSlice({
  name: "Friends",
  initialState,
  reducers: {
    Friensinfo: (state, action) => {
      state.friendsItem = action.payload;
    },
  },
});

export const { Friensinfo } = FriendSlice.actions;
export default FriendSlice.reducer;
