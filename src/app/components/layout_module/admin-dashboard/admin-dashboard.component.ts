import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';
import { Member } from 'src/app/models/member.model';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;
  approvedUsers: number = 0;
  rejectedUsers: number = 0;
  pendingUsers: number = 0;
  totalAmount: number = 0;
  allUsers: any[] = [];
  rows: Member[] = [];

  search = '';
  searchTerm: string = '';
  // status: 'all' | 'pending' | 'approved' | 'rejected' = 'all';

  members: any[] = [];
  displayedColumns: string[] = [
    'id',
    'user_id',
    'name',
    'father_name',
    'mobile_no',
    'email',
    'join_date',
    'aadhar_no',
    'pan_no',
    'address',
    'password',
    'account_status',
    'actions',
    // 'image'
  ];

  dataSource = new MatTableDataSource<any>();
  loading: boolean = false;
  status: string = 'all'; // default value, can be 'all', 'pending', 'approved', 'rejected'

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.getMembers();
    this.load();
  }

  getMembers() {
    this.http
      .get<any[]>('http://localhost:3000/api/registration')
      .subscribe((data) => {
        this.members = data;
        this.dataSource.data = data;

        // Total users count
        this.totalUsers = data.length;

        // Count approved, pending, rejected
        this.approvedUsers = data.filter(
          (u) => u.account_status === 'approved'
        ).length;
        this.rejectedUsers = data.filter(
          (u) => u.account_status === 'rejected'
        ).length;
        this.pendingUsers = data.filter(
          (u) => u.account_status === 'pending'
        ).length;

        // Total amount if needed
        this.totalAmount = data.reduce(
          (sum, member) => sum + (member.amount || 0),
          0
        );
      });
  }

  loadUsers() {
    this.dataService.getAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
      },
      error: (err) => console.error(err),
    });
  }

  onSearch() {
    this.dataSource.data = this.allUsers.filter((user) => {
      const searchLower = this.searchTerm.toLowerCase();
      return (
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower) ||
        user.user_id.toLowerCase().includes(searchLower) ||
        user.mobile_no.toLowerCase().includes(searchLower) ||
        user.account_status.toLowerCase().includes(searchLower)
      );
    });
  }

  load(): void {
    this.loading = true;
    const params: string[] = [];

    // Search filter
    if (this.search.trim()) {
      params.push(`search=${encodeURIComponent(this.search.trim())}`);
    }

    // Status filter
    if (this.status !== 'all') {
      params.push(`status=${this.status}`);
    }

    const query = params.length ? `?${params.join('&')}` : '';

    this.dataService.getData(`/registration${query}`).subscribe({
      next: (res: Member[]) => {
        this.members = res;
        this.dataSource.data = res;

        // Update counts dynamically
        this.totalUsers = res.length;
        this.approvedUsers = res.filter(
          (u: Member) => u.account_status === 'approved'
        ).length;
        this.rejectedUsers = res.filter(
          (u: Member) => u.account_status === 'rejected'
        ).length;
        this.pendingUsers = res.filter(
          (u: Member) => u.account_status === 'pending'
        ).length;

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.snack.open('Failed to load members', 'Close', { duration: 3000 });
      },
    });
  }

  approve(user: Member): void {
    this.updateStatus(user, 'approved');
  }
  reject(user: Member): void {
    this.updateStatus(user, 'rejected');
  }

  private updateStatus(user: Member, status: 'approved' | 'rejected') {
    this.dataService
      .putData(`/registration/${user.user_id}/status`, { status })
      .subscribe({
        next: (res: any) => {
          user.account_status = res.user.account_status;
          user.approve_date = res.user.approve_date;
          this.snack.open(`User ${status}`, 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.error(err);
          this.snack.open(`Failed to ${status}`, 'Close', { duration: 3000 });
        },
      });
  }

  viewMember(member: Member) {
    // Logic to view member details
  }

  editMember(member: Member) {
    // Logic to edit member details
  }

  deleteMember(member: Member) {
    // Logic to delete member
  }

  onResetSearch() {
    this.searchTerm = '';
    this.dataSource.filter = '';
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.members = this.members.slice(startIndex, endIndex);
  }

  clearFilters() {
    this.search = '';
    this.status = 'all';
    this.load(); // reload data with cleared filters
  }
}
