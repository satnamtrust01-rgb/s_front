import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../Activity_module/login/login.component';

@Component({
  selector: 'app-registration-success-dialog',
  templateUrl: './registration-success-dialog.component.html',
  styleUrls: ['./registration-success-dialog.component.scss'],
})
export class RegistrationSuccessDialogComponent {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RegistrationSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string; password: string; firstName: string }
  ) {}
  

  openLoginDialog() {
      const ref = this.dialog.open(LoginComponent, {
        width: '400px',
        disableClose: false,
      });
    }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
