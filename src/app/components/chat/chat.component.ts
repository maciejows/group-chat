import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/models/AuthState';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { logout } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user$: Observable<User>;
  constructor(
    private _auth: AuthService,
    private store: Store<{auth: AuthState}>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.auth.user);
  }

  onLogout(){
    this._auth.logout();
  }

}
