import { createReducer, Action, on } from '@ngrx/store'
import { AuthState } from '../models/AuthState';
import { loginError, loginSuccess, logoutError, logoutSuccess, registerError } from './auth.actions';


export const initialState: AuthState = {
   user: {
       email: '',
       uid: ''
   },
   isLoggedIn: false,
   error: '',
}

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, {user}) => ({...state, user: user, isLoggedIn: true})),
    on(loginError, (state, {error}) => ({...state, error: error})),
    on(logoutSuccess, (state) => ({...state, user: {email: '', uid: ''}, isLoggedIn: false})),
    on(logoutError, (state, {error}) => ({...state, error: error})),
    on(registerError, (state, {error}) => ({...state, error: error}))
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}