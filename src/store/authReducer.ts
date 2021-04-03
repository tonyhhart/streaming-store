import { createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import api, { getErrorMessage } from 'services/api';
import { StoreState, StoreDispatch } from '.';

export const authSlice = createSlice<AuthState, AuthReducers>({
    name: 'auth',
    initialState: {
        user: {
            id: 0,
            name: '',
            email: '',
            api_token: '',
        },
        api_token: undefined,
        loading: false,
        success: false,
        error: undefined
    },
    reducers: {
        login: (state) => {
            state.loading = true;
            state.success = false;
            state.error = undefined;
        },
        login_success: (state, action) => {
            state.loading = false;
            state.success = true;
            state.user = action.payload;
            state.api_token = action.payload.api_token;
        },
        login_error: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.api_token = undefined;
        },
        logout: state => {
            state.api_token = undefined;
        },
    },
});

export const { login, login_success, login_error, logout } = authSlice.actions;

export const loginAsync = (params: { email: string; password: string }) => (dispatch: StoreDispatch) => {
    dispatch(login());
    api().post('login', params)
        .then(({ data }: AxiosResponse<{ data: User }>) => {
            dispatch(login_success(data.data))
        })
        .catch((error) => {
            dispatch(login_error(getErrorMessage(error)));
        });
};

export const selectAuth = (state: StoreState) => state.auth;

export const selectApiToken = (state: StoreState) => state.auth.api_token;

export default authSlice.reducer;

export type AuthState = {
    user: User;
    api_token?: string;
    loading: boolean;
    success: boolean;
    error?: string;
}

export type AuthReducers = {
    login: (state: AuthState) => void,
    login_success: (state: AuthState, params: { payload: User }) => void,
    login_error: (state: AuthState, params: { payload: string }) => void,
    logout: (state: AuthState) => void,
}

export type AuthActions = {

}

export type User = {
    id: number;
    name: string;
    email: string;
    api_token: string;
}