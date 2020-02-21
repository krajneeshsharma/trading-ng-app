import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  throwErrors = false;
  constructor(private fb: FormBuilder) {
    this.registerForm = fb.group({
      name: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9.]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$')
      ]],
      password: ['', [
        Validators.required,
        // Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]]
    }, { validator: this.passwordMatchValidator });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value
      ? null : { mismatch: true };
  }

  ngOnInit() {
  }
  onSubmit() {
    this.throwErrors = false;
    if (!this.registerForm.valid) {
      this.throwErrors = true;
    } else {
    }
  }
}
