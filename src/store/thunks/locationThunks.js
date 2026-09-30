import { createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '@/config/axios';

export const getCitiesThunk = createAsyncThunk('auth/locations/cities', async (country, thunkAPI) => {
    try {
        console.log("inside getCitiesThunk");

        const res = await api.get(`/locations/cities?country=${country}`);

        console.log("data in getCitiesThunk is", res.data);
        return res.data;
    } catch (err) {
        console.log('error inside basic profile thunk is', err)
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Get cities thunk failed');
    }
});