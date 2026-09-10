import { createSlice } from "@reduxjs/toolkit";

import {
    loginThunk,
    signupThunk,
    verifyCodeThunk,
    logoutThunk,
    forgotPasswordThunk
} from "@/store/thunks/authThunks";

import {
    setRequestPending,
    setRequestSucceeded,
    setRequestFailed,
    clearRequestError,
    createRequestState
} from "@/store/utils/requestStateHelpers";


const initialState = {

    user: null,

    isAuthenticated: false,

};


const authSlice = createSlice({

    name: "auth",

    initialState,


    reducers: {

        resetAuthState: () => initialState,

    },


    extraReducers: (builder) => {

        builder

        // LOGIN


        .addCase(loginThunk.fulfilled, (state, action) => {

            state.user = action.payload.user;

            state.isAuthenticated = true;

        })

        // LOGOUT

        .addCase(logoutThunk.fulfilled, () => initialState);

    },

});


export const {
    resetAuthState,
} = authSlice.actions;


export default authSlice.reducer;