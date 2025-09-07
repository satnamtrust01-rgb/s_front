import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  amount: number | null = null; // null means no pre-selected plan
  mobileNumber = '';
  paymentStatus: string | null = null;
  isPlanSelected = false;
  transactionId: string = 'TXN' + Date.now();

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const amountParam = this.route.snapshot.paramMap.get('amount');
    if (amountParam) {
      this.amount = +amountParam;
      this.isPlanSelected = true; // Pre-selected plan
    }
  }

  payNow() {
    if (!this.amount) {
      alert('Please enter an amount before proceeding.');
      return;
    }

    this.paymentService
      .initiatePayment(this.amount, this.mobileNumber)
      .subscribe((res: any) => {
        if (res?.data?.instrumentResponse?.redirectInfo?.url) {
          window.location.href = res.data.instrumentResponse.redirectInfo.url;
        } else {
          alert('Payment initiation failed');
        }
      });
  }

  makePayment() {
    if (this.amount && this.amount > 0) {
      this.paymentStatus = 'Payment successful!';
    } else {
      this.paymentStatus = 'Please enter a valid amount.';
    }
  }
  // payNow() {
  //   this.http
  //     .post('http://localhost:3000/api/payment/initiate', {
  //       amount: this.amount,
  //       mobileNumber: this.mobileNumber,
  //       transactionId: this.transactionId,
  //     })
  //     .subscribe((res: any) => {
  //       if (
  //         res.data &&
  //         res.data.instrumentResponse &&
  //         res.data.instrumentResponse.redirectInfo
  //       ) {
  //         window.location.href = res.data.instrumentResponse.redirectInfo.url;
  //       }
  //     });
  // }
}
