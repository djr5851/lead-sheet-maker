import { configureStore } from '@reduxjs/toolkit'
import songsReducer from './features/songs/songsSlice'
import userReducer from './features/users/userSlice'

export default configureStore({
    reducer: {
        songs: songsReducer,
        user: userReducer,
    }
});