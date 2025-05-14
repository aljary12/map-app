import {configureStore} from '@reduxjs/toolkit';
import searchReducer from './search-slice';
import placeReducer from './place-slice';
import historyReducer from './history-slice';

export const store = configureStore({
  reducer: {
    history: historyReducer,
    search: searchReducer,
    place: placeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
