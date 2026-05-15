/* eslint-disable no-param-reassign */
import { getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  items: [] as Comment[],
  commentsLoading: false,
  hasError: false,
};

export const loadComments = createAsyncThunk(
  'comments/fetch',
  async (postId: number) => getPostComments(postId),
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, { payload }: PayloadAction<Comment[]>) {
      state.items = payload;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.items.push(action.payload);
    },
    setError(state, { payload }: PayloadAction<boolean>) {
      state.hasError = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadComments.pending, state => {
      state.items = [];
      state.hasError = false;
      state.commentsLoading = true;
    });

    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.items = action.payload;
      state.commentsLoading = false;
    });

    builder.addCase(loadComments.rejected, state => {
      state.hasError = true;
      state.commentsLoading = false;
    });
  },
});
