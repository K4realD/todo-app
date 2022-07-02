import { createSlice } from "@reduxjs/toolkit";


const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isAddTaskOpen: false,
    isAddCommentOpen: false,
  },
  reducers: {
      setAddTaskOpen(state) {
          state.isAddTaskOpen = true;
      },
      setAddCommentOpen(state) {
          state.isAddCommentOpen = true;
      },
      closeAllPopups(state) {
          state.isAddTaskOpen = false;
          state.isAddCommentOpen = false;
      }
  },
});

export const {setAddTaskOpen, setAddCommentOpen, closeAllPopups} = popupSlice.actions;

export default popupSlice.reducer;