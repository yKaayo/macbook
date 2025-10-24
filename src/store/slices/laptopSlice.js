import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedColor: "#737373",
  selectedScale: 0.08,
};

export const laptopSlice = createSlice({
  name: "laptop",
  initialState,
  reducers: {
    setColor: (state, { payload }) => {
      state.selectedColor = payload;
    },
    setScale: (state, { payload }) => {
      state.selectedScale = payload;
    },
    reset: (state) => {
      state.selectedColor = "#2e2c2e";
      state.selectedScale = 0.08;
    },
  },
});

export const { setColor, setScale, reset } = laptopSlice.actions;

export default laptopSlice.reducer;
