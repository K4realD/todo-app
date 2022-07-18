import { createSlice } from "@reduxjs/toolkit";


const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isAddTaskOpen: false,
    isAddCommentOpen: false,
    isButtonActive: false
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
      },
      toggleButtonActive(state, action) {
        state.isButtonActive = action.payload;
      }
  },
});

export const {setAddTaskOpen, setAddCommentOpen, closeAllPopups, toggleButtonActive} = popupSlice.actions;

export default popupSlice.reducer;