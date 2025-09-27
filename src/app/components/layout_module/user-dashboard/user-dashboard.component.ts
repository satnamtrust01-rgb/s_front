import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { IdcardComponent } from '../../shared_module/idcard/idcard.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // add this import

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  get isVerified(): boolean {
    return (this.user?.account_status ?? '').toLowerCase() === 'approved';
  }

  openIdCardDialog(): void {
    if (!this.isVerified) {
      this.snackBar.open(
        'Only verified members can download the ID card.',
        'OK',
        { duration: 3000 }
      );
      return;
    }

    this.dialog.open(IdcardComponent, {
      width: '380px',
      disableClose: false,
      panelClass: 'idcard-dialog',
      data: { user: this.user },
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
