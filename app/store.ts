import { configureStore } from '@reduxjs/toolkit';
import todoCalendarState from './todoCalendarSlice';
// import { enableMapSet } from 'immer';

// enableMapSet();

export const store = configureStore({
  reducer: {
    todoCalendarState
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;