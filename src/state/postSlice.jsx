import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [],
  record: null,
  loading: false,
  error: null,
};
//Get Posts
export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3030/posts");
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// Get Post Details
export const fetchPostDetails = createAsyncThunk(
  "post/fetchPostDetails",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3030/posts/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Create Post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (post, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3030/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Delete Post
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:3030/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Edit Post
export const editPost = createAsyncThunk(
  "post/editPost",
  async (post, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3030/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
  },
  extraReducers: {
    //Get Posts
    [fetchPosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Get Post Details
    [fetchPostDetails.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPostDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [fetchPostDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Create Post
    [createPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Delete Post
    [deletePost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Edit Post
    [editPost.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [editPost.fulfilled]: (state, action) => {
      state.loading = false;
      //   state.records = state.records.map((el) =>
      //     el.id === action.payload.id ? action.payload : el
      //   );
      state.record = action.payload;
    },
    [editPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { cleanRecord } = postSlice.actions;
export default postSlice.reducer;
