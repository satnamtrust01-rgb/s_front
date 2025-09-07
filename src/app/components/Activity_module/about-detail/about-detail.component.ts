import { Component } from '@angular/core';

interface DirectorFlat {
  name: string;
  position: string;
  image: string;
  quote?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

@Component({
  selector: 'app-about-detail',
  templateUrl: './about-detail.component.html',
  styleUrl: './about-detail.component.scss',
})
export class AboutDetailComponent {
  directors: DirectorFlat[] = [
    {
      name: 'Kamalkant Koshle',
      position: 'Web developer',
      image: 'images/kamalkant.jpg',
      quote: 'Building Fast, Secure, and Scalable Web Solutions.',
      linkedin: 'https://www.linkedin.com/in/kamalkant-koshle-3a3865251',
      twitter: 'https://twitter.com/kamalkant',
      email: 'mailto:kamal@example.com',
    },
    {
      name: 'Suryakant Ghritlahre',
      position: 'Program Director, Web Designer & Developer',
      image: 'images/sk.JPG',
      quote: 'Transforming lives through innovative programs',
      linkedin: '#',
      twitter: '#',
      email: 'sklahre1401@gmail.com',
    },
  ];
}
