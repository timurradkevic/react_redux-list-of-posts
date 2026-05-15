/* eslint-disable no-param-reassign */
import { getUserPosts } from '../api/posts';
import { Post } from '../types/Post';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  items: [] as Post[],
  postsLoading: false,
  hasError: false,
};

export const loadPosts = createAsyncThunk(
  'posts/fetch',
  async (userId: number) => getUserPosts(userId),
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload }: PayloadAction<Post[]>) {
      state.items = payload;
    },
    setPostsLoading(state, { payload }: PayloadAction<boolean>) {
      state.postsLoading = payload;
    },
    setError(state, { payload }: PayloadAction<boolean>) {
      state.hasError = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadPosts.pending, state => {
      state.items = [];
      state.hasError = false;
      state.postsLoading = true;
    });

    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.postsLoading = false;
    });

    builder.addCase(loadPosts.rejected, state => {
      state.hasError = true;
      state.postsLoading = false;
    });
  },
});
