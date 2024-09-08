import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './slices/postsSlice'
import usersSlice  from './slices/usersSlice'
import notificationSlice from './slices/notificationSlice'


export const store = configureStore({
    reducer: {
        posts: postsSlice,
        users: usersSlice,
        notifications: notificationSlice
    },
})