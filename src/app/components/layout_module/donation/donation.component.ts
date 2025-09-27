import { Component } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent {
  // Replace with your actual QR image or a placeholder URL
  qrImage = 'images/qr.png';

  trust = {
    name: 'सतनाम ट्रस्ट',
    ceo: 'कमलकांत कोसले',
    phone: '+91 98765 43210',
    email: 'satnamtrust01@gmail.com',
    address: 'भंडारपुरी धाम'
  };

  downloadQr() {
    window.open(this.qrImage, '_blank');
  }

  donateNow() {
    // Replace with real navigation / payment flow
    alert('Redirecting to payment gateway (placeholder).');
  }
}
