import { createReducer, Action, on } from '@ngrx/store'
import { AuthState } from '../models/AuthState';
import { loginError, loginSuccess, logoutSuccess } from './auth.actions';


export const initialState: AuthState = {
   user: {
       email: ''
   },
   isLoggedIn: false,
   error: '',
}

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, {user}) => ({...state, user: user, isLoggedIn: true})),
    on(loginError, (state, {error}) => ({...state, error: error})),
    on(logoutSuccess, (state) => ({...state, user: {email: ''}, isLoggedIn: false}))
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return _authReducer(state, action);
}