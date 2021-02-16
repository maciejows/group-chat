import { createAction, props} from '@ngrx/store';
import { Credentials } from '../models/Credentials';
import { User } from '../models/User';

export const register = createAction('[Auth service] Register', props<{credentials: Credentials}>());
export const registerSuccess = createAction('[Auth service] Register Success', props<{registerSuccess: boolean}>());
export const registerError = createAction('[Auth service] Register Error', props<{error: string}>());

export const login = createAction('[Auth service] login', props<{credentials: Credentials}>());
export const loginSuccess = createAction('[Auth service] login Success', props<{user: User}>());
export const loginError = createAction('[Auth service] login Error', props<{error: string}>());

export const logout = createAction('[Auth service] logout');
export const logoutSuccess = createAction('[Auth service] logout Success');
export const logoutError = createAction('[Auth service] logout Error', props<{error: string}>());
