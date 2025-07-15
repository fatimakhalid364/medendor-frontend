import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, signupThunk, logoutThunk } from '@/store/thunks/authThunks';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
        
        .addCase(loginThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(signupThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(signupThunk.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(signupThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(logoutThunk.fulfilled, (state) => {
            Object.assign(state, initialState); 
        });
    },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
