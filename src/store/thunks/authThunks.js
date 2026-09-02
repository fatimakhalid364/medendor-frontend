import { createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '@/config/axios';

export const signupThunk = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
    try {
        console.log("inside signupthunk");

        const res = await api.post('/auth/signup', data);

        console.log("data in signupthunk is", res.data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
});

export const verifyCodeThunk = createAsyncThunk('auth/verify-code', async (data, thunkAPI) => {
    try {
        console.log("inside verifyCodeThunk")
        const res = await api.post('/auth/verify-code', data);
        console.log("res inside verifyCodeThunk is", res.data)
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Code verification failed');
    }
});

export const loginThunk = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        console.log("inside loginthunk")
        const res = await api.post('/auth/login', credentials);
        console.log("res inside loginThunk is", res.data)
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
});


export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        console.log("inside logoutthunk")
        await api.post('/auth/logout');
        return true;
    } catch (err) {
        return thunkAPI.rejectWithValue('Logout failed');
    }
});