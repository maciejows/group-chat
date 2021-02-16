import { User } from './User';

export interface AuthState{
    user: User;
    isLoggedIn: boolean;
    error: string;
}