import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EndPoint } from '../shared/components/utils/endpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {
  private http = inject(HttpClient);
  private apiUrl = `http://localhost:8080/`;

  executeBasicAuthService(username: string, password: string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(`${username}:${password}`);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get(this.apiUrl + EndPoint.BasicAuth, { headers })
      .pipe(
        map(
          data => {
            sessionStorage.setItem('authenticaterUser', username);
            sessionStorage.setItem('token', basicAuthHeaderString);
            return data;
          }
        )
      )
  }

  excuteLogout(username: string, password: string) {
    let basicAuthHeaderString = 'Basic ' + window.btoa(`${username}:${password}`);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })
    return this.http.post(`${this.apiUrl}/logout`, { headers }, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          console.log('Logout response:', res);
          // 🧹 Xóa token / thông tin user lưu trong localStorage
          // localStorage.removeItem('authToken');
          // 🔁 Điều hướng về trang đăng nhập
          // this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout error:', err);
        }
      });
  }

  getAuthUsername() {
    return sessionStorage.getItem('authenticaterUser');
  }

  getAuthToken() {
    if (this.getAuthUsername()) {
      return sessionStorage.getItem('token');
    }
    return null;
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
    sessionStorage.removeItem('token');
  }
}
