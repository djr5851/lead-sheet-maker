import { createSlice, createEntityAdapter, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import API from '../../api/api';
import querystring from 'query-string'

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async (query) => {
    const response = await API.get(`/songs?${querystring.stringify(query)}`);
    return response.data;
});

export const fetchSongById = createAsyncThunk('songs/fetchSongById', async (id) => {
    const response = await API.get(`/songs/${id}`);
    return response.data;
});

export const searchSongs = createAsyncThunk('songs/fetchSongsByTitle', async (search) => {
    const response = await API.get(`/songs/search?searchTerm=${search}`);
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
    const response = await API.post('/songs', song);
    return response.data;
});

export const deleteSong = createAsyncThunk('songs/deleteSong', async (id) => {
    await API.delete(`/songs/${id}`);
    return id;
});

export const updateSong = createAsyncThunk('songs/updateSong', async ({ id, newSong }) => {
    const response = await API.put(`songs/${id}`, newSong);
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
        [searchSongs.pending](state) {
            state.error = null;
            state.loading = true
        },
        [searchSongs.fulfilled](state, { payload }) {
            state.error = null;
            state.loading = false
            songsAdapter.setAll(state, payload)
        },
        [searchSongs.rejected](state, action) {
            state.loading = false;
            state.error = action.error.message;
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