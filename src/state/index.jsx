import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});
