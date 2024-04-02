import { configureStore } from '@reduxjs/toolkit'
import authSlice from './feature/Auth/auth.slide'
import blogSlice  from './feature/blog.slide'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    blogs:blogSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch