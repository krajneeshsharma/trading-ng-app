import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  private subject = new BehaviorSubject<boolean>(false);
  public mySubject = this.subject.asObservable();

  getAuthData(): Observable<boolean> {
    return this.subject.asObservable();
  }

  sendAuthData(data: boolean): void {
    this.subject.next(data);
  }
  constructor() {
    if (localStorage.userId) {
      this.sendAuthData(true);
    }
  }
  getUserId(): string {
    return localStorage.userId;
  }
}
