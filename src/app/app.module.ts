import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, MatPaginatorIntl,} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { WebcamModule } from 'ngx-webcam';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NativeDateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { LoginComponent } from './components/Activity_module/login/login.component';
import { DataService } from './services/data.service';
import { AboutDetailComponent } from './components/Activity_module/about-detail/about-detail.component';
import { NewsDetailComponent } from './components/Activity_module/news-detail/news-detail.component';
import { GalleryDetailComponent } from './components/Activity_module/gallery-detail/gallery-detail.component';
import { ActivityDetailComponent } from './components/Activity_module/activity-detail/activity-detail.component';
import { AdminDashboardComponent } from './components/layout_module/admin-dashboard/admin-dashboard.component';
import { AdminFormComponent } from './components/shared_module/admin-form/admin-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { WeBuildComponent } from './components/Activity_module/we-build/we-build.component';
import { MembershipComponent } from './components/Activity_module/membership/membership.component';
import { RegistrationComponent } from './components/shared_module/registration/registration.component';
// import { LayoutComponent } from './components/layout/layout.component';
import { ProjectsComponent } from './components/Activity_module/projects/projects.component';
import { UserDashboardComponent } from './components/layout_module/user-dashboard/user-dashboard.component';
import { CommonNavbarComponent } from './components/shared_module/common-navbar/common-navbar.component';
import { HomePageComponent } from './components/layout_module/home-page/home-page.component';
import { PageNotFoundComponent } from './components/shared_module/page-not-found/page-not-found.component';
import { FooterComponent } from './components/shared_module/footer/footer.component';
import { PaymentComponent } from './components/shared_module/payment/payment.component';
import { RegistrationSuccessDialogComponent } from './components/shared_module/registration-success-dialog/registration-success-dialog.component';
import { IdcardComponent } from './components/shared_module/idcard/idcard.component';
import { CdkTableModule } from "@angular/cdk/table";
import { DonationComponent } from './components/layout_module/donation/donation.component';
import { TopDonatorComponent } from './components/layout_module/top-donator/top-donator.component';




// Custom date formats for Angular Material Datepicker
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    AboutDetailComponent,
    NewsDetailComponent,
    GalleryDetailComponent,
    ActivityDetailComponent,
    AdminDashboardComponent,
    AdminFormComponent,
    WeBuildComponent,
    MembershipComponent,
    RegistrationComponent,
    ProjectsComponent,
    UserDashboardComponent,
    CommonNavbarComponent,
    HomePageComponent,
    FooterComponent,
    PaymentComponent,
    RegistrationSuccessDialogComponent,
    IdcardComponent,
    DonationComponent,
    TopDonatorComponent,
  ],

  imports: [
    MatTabsModule,
    BrowserModule,
    MatBadgeModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSortModule,
    MatGridListModule,
    WebcamModule,
    MatMenuModule,
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
    }),
    MatTooltipModule,
    CdkTableModule
],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
