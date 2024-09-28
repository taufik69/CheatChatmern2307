import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      console.log(state.value);
    },
    decremnet: (state) => {
      state.value -= 1;
    },
    incremnetbyamount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decremnet, incremnetbyamount, reset } =
  counterSlice.actions;
export default counterSlice.reducer;
