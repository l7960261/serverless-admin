import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NB_AUTH_OPTIONS } from '@nebular/auth';
import { get } from 'lodash';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  redirectDelay: number;
  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(
    protected fb: FormBuilder,
    protected service: AuthService,
    protected router: Router,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
  ) { }

  ngOnInit() {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay', 1500);
    this.email = this.fb.control('', Validators.compose([
      Validators.required,
      Validators.email,]));
    this.password = this.fb.control('', Validators.compose([
      Validators.required,
    ]));

    this.form = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service
      .signInWithEmail(this.email.value, this.password.value)
      .then(res => {
        this.submitted = false;
        this.messages = ['You have been successfully logged in.'];

        setTimeout(() => {
          this.router.navigate(['/pages/dashboard']);
        }, this.redirectDelay);
      })
      .catch((err) => {
        this.submitted = false;
        this.errors = [err];
      });
  }

  getConfigValue(path: string, defaultValue?: any) {
    return get(this.options, path, defaultValue);
  }

}
