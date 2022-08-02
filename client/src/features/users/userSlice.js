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

export const deleteAccount = createAsyncThunk('user/deleteAccount', async (id) => {
    const response = await API.delete(`user/delete/${id}`);
    return response.data;
})

export const changePassword = createAsyncThunk('user/changePassword', async ({ id, formData }) => {
    const response = await API.put(`user/changePassword/${id}`, formData);
    return response.data;
})

const initialState = { authData: {} }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            localStorage.clear();
            state.authData = {};
            window.location.href = "/dashboard";        
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
        },
        [deleteAccount.fulfilled]: (state) => {
            userSlice.caseReducers.logout(state);
        }
    }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer