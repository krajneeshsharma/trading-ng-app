import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mock Trading Server using Angular';
  isAuth = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('app started with user', this.authService.getUserId());
    this.authService.getAuthData().subscribe(res => {
      this.isAuth = res;
    });
  }
  logout() {
    localStorage.clear();
    this.authService.sendAuthData(false);
    location.reload();
  }
}
