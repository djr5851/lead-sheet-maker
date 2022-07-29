import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SONGS_URL = 'http://localhost:5000/songs';

const initialState = {
    songs: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
    const response = await axios.get(SONGS_URL);
    return response.data
});

export const createSong = createAsyncThunk('songs/createSong', async (initialSong) => {
    const response = await axios.post(SONGS_URL, initialSong)
    return response.data
});

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchSongs.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(createSong.fulfilled, (state, action) => {
            state.songs.push(action.payload);
        })
    }
});

export const selectAllSongs = (state) => state.songs

export default songsSlice.reducer