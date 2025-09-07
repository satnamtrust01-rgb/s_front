import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: any;
  constructor(private router: Router) {}

  isPublicRoute(): boolean {
    const publicRoutes = ['/', '/login'];
    return publicRoutes.includes(this.router.url);
  }

  logout() {
    // Clear auth token or user session
    localStorage.removeItem('token'); // Or sessionStorage if you're using that
    this.router.navigate(['/login']);
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
  }
}
