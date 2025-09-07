import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { IdcardComponent } from '../../shared_module/idcard/idcard.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  role: number | string = '';
  user_id: string = '';
  allUsers: any[] = [];
  user: any = null;
  payments: any[] = [];
  isMenuOpen: boolean = false;
  totalPayments = 0;
  pageSize = 5;
  currentPage = 0;
  displayedColumns: string[] = ['id', 'amount', 'payment_date'];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded: any = jwtDecode(token);
    this.role = decoded.role;
    this.user_id = decoded.user_id;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.dashboardService.getUserDashboard(this.user_id, headers).subscribe({
      next: (res) => {
        if (this.role === '1' || this.role === 1) {
          this.allUsers = res.users;
        } else {
          this.user = res.user;
          this.payments = res.payments;
        }
      },
      error: (err) => {
        console.error('Error fetching dashboard data', err);
      },
    });
  }

  openIdCardDialog(): void {
    this.dialog.open(IdcardComponent, {
      // width: '400px',
      // height: '600px',
      data: { user: this.user }, // Pass user data if needed
      disableClose: false,
      panelClass: 'idcard-dialog',
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
