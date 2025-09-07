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
  @ViewChild('idCard', { static: false }) idCard!: ElementRef;
  @ViewChild('downloadBtn', { static: false }) downloadBtn!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<IdcardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {
    this.user = data.user;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 300);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

   downloadIdCard() {
    const element = this.idCard?.nativeElement;

    if (!element) {
      console.error('ID Card element is missing!');
      return;
    }

    // Hide the download button temporarily
    if (this.downloadBtn?.nativeElement) {
      this.downloadBtn.nativeElement.style.display = 'none';
    }

    html2canvas(element, {
      scale: 4,             // High resolution
      useCORS: true,        // Handle cross-origin images
      backgroundColor: '#fff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // CR80 standard ID card size
      const imgWidth = 250;
      const imgHeight = 400;

      const pdf = new jsPDF('portrait', 'px', [imgWidth, imgHeight]);
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${this.user?.first_name || 'User'}_ID_Card.pdf`);

      // Show download button again
      if (this.downloadBtn?.nativeElement) {
        this.downloadBtn.nativeElement.style.display = 'block';
      }
    });
  }

}
