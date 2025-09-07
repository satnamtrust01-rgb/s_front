import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const userRole = this.authService.getRole(); // Get the role from localStorage
    const requiredRole =
      this.router.routerState.snapshot.root.firstChild?.data['role']; // Get the required role from route data

    if (userRole === requiredRole) {
      return true;
    } else {
      this.router.navigate(['/home']); // Redirect if the roles don't match
      return false;
    }
  }
}
