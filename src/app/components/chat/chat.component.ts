import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/models/AuthState';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages$: Observable<any>;
  user$: Observable<User>;
  constructor(
    private _auth: AuthService,
    private _messageService: MessageService,
    private store: Store<{auth: AuthState}>) { }

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.auth.user);
    this.messages$ = this._messageService.getMessages();
  }

  sortMessages(array: []){
    return array.sort((a: any, b: any) => a.createdAt - b.createdAt);
  }

  addMessage(email: string, message: string): void {
    this._messageService.addMessage(email, message);
  }

  onLogout(){
    this._auth.logout();
  }

}
