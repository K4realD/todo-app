import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
    name: "input",
    initialState: {
      title: (''),
      text: (''),
      comment: (''),
      search: ('')
    },
    reducers: {
        setTitle(state, action) {
            state.title = action.payload;
        },
        setComment(state, action) {
            state.comment = action.payload;
        },
        setText(state, action) {
            state.text = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        }
    },
  });
  
  export const {setComment, setText, setTitle, setSearch} = inputSlice.actions;
  
  export default inputSlice.reducer;