import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../Activity_module/login/login.component';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  isAdmin = false;
  isMenuOpen = false;
  galleryImages = [
    'assets/images/gallery1.jpg',
    'assets/images/gallery2.jpg',
    'assets/images/gallery3.jpg',
    // etc.
  ];
  newslist = [{ id: '1', title: 'News 1', content: 'Content for news 1' }];

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isAdmin = !!localStorage.getItem('token');
    }
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 0); // allow rendering to finish
      }
    });

    // if (!this.authService.isAdmin()) {
    //   this.router.navigate(['/login']);
    // }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** opens the LoginComponent in a Material dialog */
  openLoginDialog() {
    const ref = this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: false,
    });
    ref.afterClosed().subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.isAdmin = !!localStorage.getItem('token');
      }
    });
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(sectionId);
      }, 100);
      this.isMenuOpen = false; // close mobile nav if open
    }
  }

  navigateToAboutDetail(id: string) {
    this.router.navigate(['/about', id]);
  }

  openGalleryImage(index: number) {
    this.router.navigate(['/gallery', index]);
  }

  goToNews(id: string) {
    this.router.navigate(['/news', id]);
  }

  goToAbout(id: string) {
    this.router.navigate(['/about', id]);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.isAdmin = false;
    }
    this.router.navigate(['/home']);
  }
}
