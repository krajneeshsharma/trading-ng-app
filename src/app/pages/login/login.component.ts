import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  throwErrors = false;
  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$')
      ]],
      password: ['', [
        Validators.required,
        // Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')
      ]]
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    this.throwErrors = false;
    if (!this.loginForm.valid) {
      this.throwErrors = true;
    } else {
    }
  }

}
