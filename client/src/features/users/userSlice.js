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

export const getUserByUsername = createAsyncThunk('user/getUserByUsername', async (username) => {
    const response = await API.get(`user/${username}`);
    return response.data;
})

const initialState = {
    authData: {},
    selectedUser: null,
    error: null,
    loading: false
}

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
        [signIn.pending]: (state, action) => {
            state.error = null;
            state.loading = true;
        },
        [signIn.fulfilled]: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload));
            state.authData = action.payload;
            state.loading = false;
            state.error = null;
            window.location.href = "/dashboard";
        },
        [signIn.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [signUp.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [signUp.fulfilled]: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload));
            state.authData = action.payload;
            state.loading = false;
            state.error = null;
            window.location.href = "/dashboard";
        },
        [signUp.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
            state.error = action.error.message;
        },
        [getUserByUsername.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getUserByUsername.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.selectedUser = action.payload;
        },
        [getUserByUsername.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
            state.selectedUser = null;
        },
        [deleteAccount.fulfilled]: (state) => {
            userSlice.caseReducers.logout(state);
        }
    }
})

export const { logout } = userSlice.actions;

export const getUserError = (state) => state.user.error;
export const getUserLoading = (state) => state.user.loading;
export const getSelectedUser = (state) => state.user.selectedUser;

export default userSlice.reducer