import { Component } from '@angular/core';

interface Donor {
  rank: number;
  name: string;
  message: string;
  amount: string;
  date: string;
  badge?: string;
}

@Component({
  selector: 'app-top-donator',
  templateUrl: './top-donator.component.html',
  styleUrls: ['./top-donator.component.scss']
})
export class TopDonatorComponent {
  stats = [
    { value: '₹0,00,000', label: 'Total Donations ' },
    { value: '₹0,00,000', label: 'Donors This Year' },
    { value: '₹0,00,000', label: 'Total Donations This Month' },
    { value: '₹0,00,000', label: 'Top Donation This Week' },
    { value: '₹0,00,000', label: 'Last Donation' },
  ];

  donors: Donor[] = [
    // { rank: 1, name: 'Aarav Kumar', message: 'Education is the most powerful weapon we can use to change the world.', amount: '₹50,000', date: '15 Aug 2023', badge: 'Top Donor' },
    // { rank: 2, name: 'Priya Sharma', message: 'Happy to support such a noble cause!', amount: '₹35,000', date: '20 Aug 2023', badge: 'New Donor' },
    // { rank: 3, name: 'Rahul Joshi', message: 'Keep up the great work!', amount: '₹25,000', date: '05 Aug 2023' },
    // { rank: 4, name: 'Sunita Mehta', message: 'Every child deserves a chance to learn.', amount: '₹20,000', date: '12 Aug 2023' },
    // { rank: 5, name: 'Vikram Patel', message: 'Proud to be part of this initiative.', amount: '₹18,500', date: '18 Aug 2023' },
    // { rank: 6, name: 'Anjali Singh', message: 'Small contributions can make big differences.', amount: '₹15,000', date: '22 Aug 2023' },
    // { rank: 7, name: 'Deepak Gupta', message: 'Inspiring work by Satnam Trust.', amount: '₹12,000', date: '10 Aug 2023' },
    // { rank: 8, name: 'Neha Mishra', message: 'My first donation, but definitely not the last!', amount: '₹10,000', date: '25 Aug 2023', badge: 'New Donor' },
  ];
}
