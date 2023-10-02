import { configureStore } from '@reduxjs/toolkit'
import {apiUser} from './services/apiUser.tsx';
import { apiJob } from './services/apiJobs.tsx';

export const store = configureStore({
  reducer: {
    [apiUser.reducerPath]:apiUser.reducer,
    [apiJob.reducerPath]:apiJob.reducer

  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiUser.middleware,apiJob.middleware),
  

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch