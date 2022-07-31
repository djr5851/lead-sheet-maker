import { createSlice, createEntityAdapter, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios';

const SONGS_URL = 'http://localhost:5000/songs';

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
    const response = await axios.get(SONGS_URL);
    return response.data;
});

export const fetchSongById = createAsyncThunk('songs/fetchSongById', async (id) => {
    const response = await axios.get(`${SONGS_URL}/${id}`);
    return response.data;
});

export const createSong = createAsyncThunk('songs/createSong', async (song) => {
    song.measures = [
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        },
        {
            id: nanoid(),
            beats: 4,
            chords: ['', '', '', '']
        }
    ];
    const response = await axios.post(SONGS_URL, song);
    return response.data;
});

export const deleteSong = createAsyncThunk('songs/deleteSong', async (id) => {
    await axios.delete(SONGS_URL, { data: { id }});
    return id;
});

export const updateSong = createAsyncThunk('songs/updateSong', async ({ id, newSong }) => {
    const response = await axios.put(`${SONGS_URL}/${id}`, newSong);
    return { id: response.data._id, changes: newSong };
})

const songsAdapter = createEntityAdapter({
  selectId: (song) => song._id,
})

const songsSlice = createSlice({
    name: 'songs',
    initialState: songsAdapter.getInitialState({ loading: false, error: null, selectedSong: null }),
    reducers: {},
    extraReducers: {
        [fetchSongs.pending](state) {
            state.error = null;
            state.loading = true
        },
        [fetchSongs.fulfilled](state, { payload }) {
            state.error = null;
            state.loading = false
            songsAdapter.setAll(state, payload)
        },
        [fetchSongs.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
        [fetchSongById.pending](state) {
            state.error = null;
            state.loading = true
            state.selectedSong = null;
        },
        [fetchSongById.fulfilled](state, { payload }) {
            state.error = null;
            state.loading = false
            state.selectedSong = payload;
        },
        [fetchSongById.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
            state.selectedSong = null;
        },
        [createSong.pending](state) {
            state.error = null;
            state.loading = true
        },
        [createSong.fulfilled](state, { payload }) {
            state.error = null;
            state.loading = false;
            songsAdapter.addOne(state, payload);
        },
        [createSong.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
        [deleteSong.pending](state) {
            state.error = null;
            state.loading = true
        },
        [deleteSong.fulfilled](state, { payload: id }) {
            state.error = null;
            state.loading = false
            songsAdapter.removeOne(state, id)
        },
        [deleteSong.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
        [updateSong.pending](state) {
            state.error = null;
            state.loading = true
        },
        [updateSong.fulfilled](state, { payload }) {
            state.error = null;
            state.loading = false
            songsAdapter.updateOne(state, { id: payload.id, changes: payload.changes });
        },
        [updateSong.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
        },
    },
})

export const songsSelectors = songsAdapter.getSelectors(
  (state) => state.songs
)

export const getSongsLoading = (state) => state.songs.loading;
export const getSongsError = (state) => state.songs.error;
export const getSelectedSong = (state) => state.songs.selectedSong;

export default songsSlice.reducer