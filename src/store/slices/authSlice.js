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

    requestStatus: {

        login: createRequestState(),

        signup: createRequestState(),

        verifyCode: createRequestState(),

        forgotPassword: createRequestState(),

    },

};


const authSlice = createSlice({

    name: "auth",

    initialState,


    reducers: {

        resetAuthState: () => initialState,


        clearLoginError: (state) => {
            clearRequestError(
                state.requestStatus.login
            );
        },


        clearSignupError: (state) => {
            clearRequestError(
                state.requestStatus.signup
            );
        },


        clearVerifyCodeError: (state) => {
            clearRequestError(
                state.requestStatus.verifyCode
            );
        },

        clearForgotPasswordError: (state) => {
            clearRequestError(
                state.requestStatus.forgotPassword
            );
        },

    },


    extraReducers: (builder) => {

        builder

        // LOGIN

        .addCase(loginThunk.pending, (state) => {

            setRequestPending(
                state.requestStatus.login
            );

        })


        .addCase(loginThunk.fulfilled, (state, action) => {

            state.user = action.payload.user;

            state.isAuthenticated = true;


            setRequestSucceeded(
                state.requestStatus.login
            );

        })


        .addCase(loginThunk.rejected, (state, action) => {

            setRequestFailed(
                state.requestStatus.login,
                action.payload.message
            );

        })


        // SIGNUP

        .addCase(signupThunk.pending, (state) => {

            setRequestPending(
                state.requestStatus.signup
            );

        })


        .addCase(signupThunk.fulfilled, (state) => {

            setRequestSucceeded(
                state.requestStatus.signup
            );

        })


        .addCase(signupThunk.rejected, (state, action) => {

            setRequestFailed(
                state.requestStatus.signup,
                action.payload.message
            );

        })


        // VERIFY CODE

        .addCase(verifyCodeThunk.pending, (state) => {

            setRequestPending(
                state.requestStatus.verifyCode
            );

        })


        .addCase(verifyCodeThunk.fulfilled, (state) => {

            setRequestSucceeded(
                state.requestStatus.verifyCode
            );

        })


        .addCase(verifyCodeThunk.rejected, (state, action) => {

            setRequestFailed(
                state.requestStatus.verifyCode,
                action.payload.message
            );

        })

        .addCase(forgotPasswordThunk.pending, (state)=> {

            setRequestPending(
                state.requestStatus.forgotPassword,

            );
        })

        .addCase(forgotPasswordThunk.fulfilled, (state)=> {

            setRequestSucceeded(state.requestStatus.forgotPassword);

        })

        .addCase(forgotPasswordThunk.rejected, (state, action)=> {

            setRequestFailed(
                state.requestStatus.forgotPassword,
                action.payload.message
            )
        })


        // LOGOUT

        .addCase(logoutThunk.fulfilled, () => initialState);

    },

});


export const {
    resetAuthState,
    clearLoginError,
    clearSignupError,
    clearVerifyCodeError,
    clearForgotPasswordError
} = authSlice.actions;


export default authSlice.reducer;