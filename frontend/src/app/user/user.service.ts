import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  loggedInEvent: EventEmitter<any> = new EventEmitter();

  private baseUrl = "http://localhost:8080/api/auth";

  constructor(private httpClient: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, credentials);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  emitLoggedInEvent() {
    this.loggedInEvent.emit();
  }

  verifyCode(userId: string, code: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/verify`, {userId, code});
  }
}
