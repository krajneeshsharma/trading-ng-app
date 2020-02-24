import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  throwErrors = false;
  constructor(private fb: FormBuilder, private router: Router,private authService : AuthService, private userService: UserService, private  toastr: ToastrService) {
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
      this.userService.loginUser(this.loginForm.value)
        .subscribe((res) => { 
          console.log(res);
          localStorage.userId = res['data']['userId'];
          this.authService.sendAuthData(true);
          this.toastr.success('Success', res['message']);
          this.router.navigate(['/']);
        }, (err) => {
          this.toastr.error('Error', err['error']['message']);
        });
    }
  }

}
