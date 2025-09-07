import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const role = this.authService.getRole(); // number now
    console.log('AdminGuard role:', role);

    if (role === 1) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
