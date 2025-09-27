import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors,} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl:'./registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  selectedImage!: File;
  today: Date = new Date();
  selectedFile: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.registrationForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-zऀ-ॿ ]+$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-zऀ-ॿ ]+$')],
        ],
        father_name: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-zऀ-ॿ ]+$')],
        ],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        occupation: [
          '',
          [Validators.required, Validators.pattern('^[A-Za-zऀ-ॿ ]+$')],
        ],
        mobile_no: [
          '',
          [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        aadhar_no: ['', [ Validators.pattern(/^\d{12}$/)]],
        pan_no: [
          '',
          [
            Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
          ],
        ],
        address: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            // Validators.pattern(
            //   /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
            // ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator.bind(this) }
    );
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();

      Object.keys(this.registrationForm.value).forEach((key) => {
        if (key !== 'confirmPassword' && key !== 'terms') {
          if (key === 'dob') {
            formData.append(
              key,
              new Date(this.registrationForm.value.dob)
                .toISOString()
                .split('T')[0]
            );
          } else {
            formData.append(key, this.registrationForm.value[key]);
          }
        }
      });

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      this.dataService.postData('/registration/register', formData).subscribe({
        next: (res) => {
          const firstName = this.registrationForm.value.firstName; // capture BEFORE reset

          // open success dialog
          this.dialog.open(RegistrationSuccessDialogComponent, {
            width: '500px',
            data: {
              userId: res.userId,
              password: res.password,
              firstName,
            },
          });

          // now reset
          this.registrationForm.reset();
          this.selectedImage = undefined!;
        },
        error: (err) => {
          console.error('Error registering:', err);
          this.snackBar.open('Registration failed!', 'Close', {
            duration: 3000,
          });
        },
      });
    } else {
      this.registrationForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
    }
  }

  allowAlphabetsOnly(event: KeyboardEvent): void {
    const charCode = event.key;
    const isAlphabet = /^[A-Za-z\u0900-\u097F\s]*$/.test(charCode);
    if (!isAlphabet) {
      event.preventDefault();
    }
  }

  allowNumbersOnly(event: KeyboardEvent): void {
    const charCode = event.key;
    const isNumber = /^[0-9]*$/.test(charCode);
    if (!isNumber) {
      event.preventDefault();
    }
  }



  onClear(): void {
    this.registrationForm.reset();
  }

  onClose(): void {
    this.registrationForm.reset();
  }
}
