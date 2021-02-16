import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/models/AuthState';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from '../../models/Credentials';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  error$: Observable<string>;
  
  constructor(
    private store: Store<{auth: AuthState}>,
    private _auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
      ])
    });
    this.error$ = this.store.select(state => state.auth.error);
  }

  onSubmit(){
    let email: string = this.form.value.emailFormControl;
    let password: string = this.form.value.passwordFormControl;
    this._auth.register(new Credentials(email, password));
  }
}
