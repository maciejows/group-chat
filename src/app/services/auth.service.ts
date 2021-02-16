import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../models/User';
import { AuthState } from '../models/AuthState';
import { Store } from '@ngrx/store';
import { loginError, loginSuccess, logoutError, logoutSuccess, registerError, registerSuccess } from '../store/auth.actions';
import { Router } from '@angular/router';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private store: Store<{auth: AuthState}>,
    private router: Router,
    private fireAuth: AngularFireAuth) {}
 
  login(credentials: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => this.handleLoginSuccess(data))
      .catch(error => this.store.dispatch(loginError({error: error})));
  }

  handleLoginSuccess(data: any){
    let user = new User(JSON.parse(JSON.stringify(data)));
    this.store.dispatch(loginSuccess({user: user}));
    this.router.navigateByUrl('/chat')
  }

 
  register(credentials: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((_) => this.handleRegisterSuccess())
    .catch(error => this.store.dispatch(registerError({error: error})));
  }

  handleRegisterSuccess(){
    this.router.navigateByUrl('/');
    alert("Account created!");
  }
 
  logout() {
    return this.fireAuth.signOut()
    .then((_) => this.handleLogoutSuccess())
    .catch(error => this.store.dispatch(logoutError({error: error})));
  }

  handleLogoutSuccess(){
    this.store.dispatch(logoutSuccess());
    this.router.navigateByUrl('/');
  }
}