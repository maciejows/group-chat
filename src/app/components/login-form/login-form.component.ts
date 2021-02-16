import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        // Todo; Any else?
      ])
    })
  }

  onSubmit(){
    let email: string = this.form.value.emailFormControl;
    let password: string = this.form.value.passwordFormControl;
    this._auth.login(email, password);
  }

}
