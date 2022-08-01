import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const signUp = createAsyncThunk('user/signUp', async (formData) => {
    const response = await API.post(`user/signup`, formData);
    return response.data;
})

export const signIn = createAsyncThunk('user/signIn', async (formData) => {
    const response = await API.post(`user/signin`, formData);
    return response.data;
})

const initialState = { authData: {} }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            localStorage.clear();
            window.location.href = "/dashboard";        
            state.authData = {};
        }
    },
    extraReducers: {
        [signIn.fulfilled]: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload));
            state.authData = action.payload;
            window.location.href = "/dashboard";
        },
        [signUp.fulfilled]: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload));
            state.authData = action.payload;
            window.location.href = "/dashboard";
        }
    }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer