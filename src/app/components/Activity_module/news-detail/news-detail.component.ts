import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  totalEmployees = 1;
  totalApplications = 0;

  searchTitle: string = '';
  searchDate: string = '';

  // ✅ Dynamic Appointments
  appointments = [
    {
      title: 'New CEO Appointment',
      name: 'Kamalkant Koshle',
      date: '2025-08-29',
      message:
        'has been appointed as the new CEO of Satnam Trust. Please join us in welcoming him to this leadership role!',
      icon: 'emoji_events',
      color: '#d32f2f'
    },
    // {
    //   title: 'Office Assistant Appointment',
    //   name: 'Mr Satnami',
    //   date: '2025-09-12',
    //   message:
    //     'has joined Satnam Trust as our new Office Assistant. Wishing him all the best in his new role!',
    //   icon: 'person',
    //   color: '#388e3c'
    // }
  ];

  // ✅ Vacancy Data
  vacancies = [
    { title: 'Office Assistant', date: '2025-09-12', pdf: 'assets/vacancy-office-assistant.pdf' },
    { title: 'HR Executive', date: '2025-09-10', pdf: 'assets/vacancy-hr-executive.pdf' },
    { title: 'Data Entry Operator', date: '2025-09-05', pdf: 'assets/vacancy-data-entry.pdf' },
    { title: 'Accountant', date: '2025-08-30', pdf: 'assets/vacancy-accountant.pdf' },
  ];

  filteredVacancies = [...this.vacancies];

  ngOnInit(): void {
    this.filterVacancies();
  }

  filterVacancies(): void {
    this.filteredVacancies = this.vacancies.filter(v => {
      const matchTitle = this.searchTitle
        ? v.title.toLowerCase().includes(this.searchTitle.toLowerCase())
        : true;

      const matchDate = this.searchDate ? v.date === this.searchDate : true;

      return matchTitle && matchDate;
    });
  }
}


