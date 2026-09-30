import { createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '@/config/axios';

export const basicProfileThunk = createAsyncThunk('auth/basicProfile', async ({role, data}, thunkAPI) => {
    try {
        console.log("inside basicProfilethunk");

        const res = await api.post(`/profile/${role}/basic-info`, data);

        console.log("data in basicProfileThunk is", res.data);
        return res.data;
    } catch (err) {
        console.log('error inside basic profile thunk is', err)
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Basic profile submission failed');
    }
});