import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/api/auth/login';

  constructor(private router: Router,private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setRefreshToken(refresh: string) {
    localStorage.setItem('refreshToken', refresh);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log("role data "+payload.role)
    return payload.role;
  }

  isLoggedIn(): boolean {
    const role = this.getUserRole();
    return !!this.getToken() &&  (role === 'Admin');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, { username, password });
  }
}
