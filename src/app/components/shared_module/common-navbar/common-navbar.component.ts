import { Component, Inject, HostListener, PLATFORM_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from '../../Activity_module/login/login.component';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.scss'],
})
export class CommonNavbarComponent implements OnInit {
  isMenuOpen = false;
  isAdmin = false;
  isLoggedIn = false;
  activeRoute = '';
  isShrunk = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isShrunk = scrollY > 50; // Shrink after 50px scroll
  }

  constructor(
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
      this.isAdmin = localStorage.getItem('role') === 'admin'; // optional role check
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openLoginDialog() {
    const ref = this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: false,
    });

    ref.afterClosed().subscribe((result) => {
      // After login modal closes, check status again
      this.checkLoginStatus();
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    }
  }
}
