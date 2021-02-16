import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../models/User';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
 
  constructor(private fireAuth: AngularFireAuth) {}
 
  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then( data => console.log(data))
      .catch(error => console.log(error));
  }
 
  register(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then( data => console.log(`Register ${data}`))
    .catch(error => console.log(error));
  }
 
  logout() {
    return this.fireAuth.signOut();
  }
}