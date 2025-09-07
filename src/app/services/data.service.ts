import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
// import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private apiUrl = 'http://localhost:3000/api';
  private usersUrl = 'http://localhost:3000/api/userdashboard';
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  postData(functionName: any, data: any): Observable<any> {
    return this.http.post(this.apiUrl + functionName, data);
  }

  getData(functionName: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + functionName);
  }

  putData(user_id: any, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${user_id}`, data);
  }

  deleteData(user_id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}${user_id}`);
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/all-users`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Method to get authorization headers
  private getAuthHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Update account status
  updateAccountStatus(id: number, status: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/dashboard/update-status/${id}`,
      { status },
      { headers: this.getAuthHeaders() }
    );
  }

  // getAllUsers(): Observable<any> {
  //   return this.http.get(this.usersUrl);
  // }

  getUserById(user_id: string): Observable<any> {
    return this.http.get(`${this.usersUrl}/${user_id}`);
  }
}
