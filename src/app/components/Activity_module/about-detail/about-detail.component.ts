import { Component } from '@angular/core';

interface DirectorFlat {
  name: string;
  position: string;
  image: string;
  quote?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
}

@Component({
  selector: 'app-about-detail',
  templateUrl: './about-detail.component.html',
  styleUrl: './about-detail.component.scss',
})
export class AboutDetailComponent {
  directors: DirectorFlat[] = [
    {
      name: 'गुरु सोमेश बाबा जी',
      position: 'सतनाम ट्रस्ट के संस्थापक एवं अध्यक्ष',
      image: 'images/Guru Somesh Baba.jpg',
      quote: 'संस्थापक - सतनाम ट्रस्ट भंडारपुरी धाम, जिला रायपुर (छ.ग.)',
      linkedin: 'https://www.linkedin.com/in/kamalkant-koshle-3a3865251',
      twitter: 'https://twitter.com/kamalkant',
      email: 'satnamtrust01@gmail.com',
      facebook: 'https://www.facebook.com/gurusomeshbaba',
      instagram: 'https://www.instagram.com/gurusomeshbaba',
    },
    {
      name: 'कमलकांत कोसले',
      position: 'सतनाम ट्रस्ट के मुख्य कार्यकारी अधिकारी',
      image: 'images/kamalkant.jpg',
      quote: 'मुख्य कार्यकारी अधिकारी - सतनाम ट्रस्ट भंडारपुरी धाम, जिला रायपुर (छ.ग.)',
      linkedin: 'https://www.linkedin.com/in/kamalkant-koshle-3a3865251',
      twitter: 'https://twitter.com/kamalkant',
      email: 'satnamtrust01@gmail.com',
      facebook: 'https://www.facebook.com/kamalkant.koshle',
      instagram: 'https://www.instagram.com/kamalkant.koshle',
    },
  ];
}
