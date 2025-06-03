import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User, SignupDto, SigninDto, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  private tokenExpirationTime = 8 * 60 * 60 * 1000;

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage()
  );
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkTokenExpiration();
  }

  signup(signupData: SignupDto): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, signupData);
  }

  signin(signinData: SigninDto): Observable<AuthResponse> {
    return this.http.post<User>(`${this.apiUrl}/signin`, signinData).pipe(
      map((user) => ({ user, token: this.generateToken() })),
      tap((response) => {
        this.setAuthData(response.user, response.token!);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  signout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    localStorage.removeItem('auth_timestamp');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const timestamp = localStorage.getItem('auth_timestamp');

    if (!token || !timestamp) {
      return false;
    }

    const loginTime = parseInt(timestamp, 10);
    const currentTime = new Date().getTime();
    const hasExpired = currentTime - loginTime > this.tokenExpirationTime;

    if (hasExpired) {
      this.signout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setAuthData(user: User, token: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    localStorage.setItem('auth_timestamp', new Date().getTime().toString());
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  private generateToken(): string {
    // In a real app, this would come from your backend
    return `token_${new Date().getTime()}_${Math.random()}`;
  }

  private checkTokenExpiration(): void {
    // Check token expiration on service initialization
    if (!this.isAuthenticated()) {
      this.signout();
    }
  }
}
