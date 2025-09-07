import { Component } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { LoginComponent } from '../../Activity_module/login/login.component';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
})
export class MembershipComponent {
  isAnnualPlanSelected = true;
  isMonthlyPlanSelected = false;
  isDailyPlanSelected = false;

  constructor (
    private dialog: MatDialog,
    
  ){}


    openLoginDialog() {
      const ref = this.dialog.open(LoginComponent, {
        width: '400px',
        disableClose: false,
      });
    }
}
