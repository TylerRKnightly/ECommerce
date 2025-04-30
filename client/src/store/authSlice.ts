import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { User } from '../types/user'
import axios from 'axios';


interface AuthModel {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthModel = {
    user: null,
    loading: false,
    error: null,
};

export interface LoginCreds {
    email: string;
    password: string;
}

export const login = createAsyncThunk('auth/login', async (credentials: LoginCreds, thunkAPI) => {
    try {
        return await authService.login(credentials);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('Login failed');
    }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
    try {
        return await authService.getProfile();
    } catch (error) {
        return thunkAPI.rejectWithValue('Not authenticated');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
        clearAuthError(state) {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;