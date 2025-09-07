import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  initiatePayment(amount: number, mobileNumber: string): Observable<any> {
    return this.http.post(`${this.API_URL}/pay`, { amount, mobileNumber });
  }

  checkStatus(txnId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/status/${txnId}`);
  }
}
