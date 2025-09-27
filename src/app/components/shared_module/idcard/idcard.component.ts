import {
  Component,
  Inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-idcard',
  templateUrl: './idcard.component.html',
  styleUrls: ['./idcard.component.scss'],
})
export class IdcardComponent implements AfterViewInit {
  user: any;
  isVerified = false;

  @ViewChild('idCard') idCard!: ElementRef;
  @ViewChild('downloadArea') downloadArea!: ElementRef;
  @ViewChild('downloadBtn') downloadBtn!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IdcardComponent>,
    private cdr: ChangeDetectorRef
  ) {
    this.user = data?.user || null;
    this.isVerified =
      (this.user?.account_status || '').toLowerCase() === 'approved';
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  downloadIdCard(): void {
    if (!this.isVerified) {
      // extra safety (should never reach here because button is hidden)
      alert('Only verified users can download the ID card.');
      return;
    }

    if (this.downloadBtn?.nativeElement) {
      this.downloadBtn.nativeElement.style.display = 'none';
    }

    const el = this.downloadArea?.nativeElement || this.idCard?.nativeElement;

    html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 250;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('portrait', 'px', [imgWidth, imgHeight]);
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${this.user?.first_name || 'User'}_ID_Card.pdf`);

      if (this.downloadBtn?.nativeElement) {
        this.downloadBtn.nativeElement.style.display = 'block';
      }
    });
  }
}
