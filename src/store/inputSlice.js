import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: "input",
    initialState: {
      title: ({value: (""), valid: false, errorMessage: ("")}),
      text: ({value: (""), valid: false, errorMessage: ("")}),
      comment: ({value: (""), valid: false, errorMessage: ("")}),
      search: ('')
    },
    reducers: {
        setTitle(state, action) {
            state.title.value = action.payload;
        },
        setComment(state, action) {
            state.comment.value = action.payload;
        },
        setText(state, action) {
            state.text.value = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        },
        setTitleValidity(state, action) {
            state.title.valid = action.payload;
        },
        setTextValidity(state, action) {
            state.text.valid = action.payload;
        },
        setCommentValidity(state, action) {
            state.comment.valid = action.payload;
        },
        setTitleError(state, action) {
            state.title.errorMessage = action.payload;
        },
        setTextError(state, action) {
            state.text.errorMessage = action.payload;
        },
        setCommentError(state, action) {
            state.comment.errorMessage = action.payload;
        }
    },
  });
  
  export const {setComment, setText, setTitle, setSearch, setTitleValidity, setTextValidity, setCommentValidity, setTitleError, setTextError, setCommentError} = inputSlice.actions;
  
  export default inputSlice.reducer;