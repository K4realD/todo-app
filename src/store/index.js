import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "./todoSlice.js"
import popupReducer from "./popupSlice.js";
import inputReducer from "./inputSlice.js"

export default configureStore({
    reducer: {
        todos: todoReducer,
        popup: popupReducer,
        input: inputReducer
    }
})