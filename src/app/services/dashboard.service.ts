import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000/api'; // adjust if needed

  constructor(private http: HttpClient) {}

  getUserDashboard(user_id: string, headers: HttpHeaders) {
    return this.http
      .get<any>(`${this.baseUrl}/userdashboard/${user_id}`, { headers })
      .pipe(
        map((res) => {
          // Map single user image
          if (res.user && res.user.image) {
            res.user.image = `http://localhost:3000${res.user.image}`;
          }

          // // Map multiple users (for admin)
          // if (res.users && Array.isArray(res.users)) {
          //   res.users = res.users.map((user: any) => {
          //     if (user.image) {
          //       user.image = `http://localhost:3000/upload/profile/${user.image}`;
          //     }
          //     return user;
          //   });
          // }

          return res;
        })
      );
  }
}
