import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.loginForm = this.fb.group({
      mobile_no: [
        '',
        [Validators.required, Validators.pattern('^[6-9]\\d{9}$')],
      ],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const credentials = this.loginForm.value;

    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        // Expecting backend to return { token, role, userId }
        this.auth.saveAuthData(res.token, res.role, res.user_id);

        if (res.role === 1) {
          this.router.navigate(['/adminDashboard']);
        } else {
          this.router.navigate(['/userDashboard']);
        }
        this.dialogRef.close();
      },
      error: () => {
        this.errorMessage = 'Invalid login';
      },
    });
  }

  onRegister(): void {
    this.dialogRef.close();
    this.router.navigate(['/registration']);
  }

  onForgotPassword(): void {
    this.dialogRef.close();
    this.router.navigate(['/forgot-password']);
  }
}
