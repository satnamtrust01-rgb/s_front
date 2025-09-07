import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/shared_module/page-not-found/page-not-found.component';
import { HomePageComponent } from './components/layout_module/home-page/home-page.component';
import { LoginComponent } from './components/Activity_module/login/login.component';
import { GalleryDetailComponent } from './components/Activity_module/gallery-detail/gallery-detail.component';
import { AdminDashboardComponent } from './components/layout_module/admin-dashboard/admin-dashboard.component';
import { AboutDetailComponent } from './components/Activity_module/about-detail/about-detail.component';
import { ActivityDetailComponent } from './components/Activity_module/activity-detail/activity-detail.component';
import { NewsDetailComponent } from './components/Activity_module/news-detail/news-detail.component';
import { RegistrationComponent } from './components/shared_module/registration/registration.component';
import { WeBuildComponent } from './components/Activity_module/we-build/we-build.component';
import { MembershipComponent } from './components/Activity_module/membership/membership.component';
import { ProjectsComponent } from './components/Activity_module/projects/projects.component';
import { UserDashboardComponent } from './components/layout_module/user-dashboard/user-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { EmpGuard } from './guards/emp.guard';
import { PaymentComponent } from './components/shared_module/payment/payment.component';
import { IdcardComponent } from './components/shared_module/idcard/idcard.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'gallery/:id', component: GalleryDetailComponent },
  // { path: 'admin', component: AdminDashboardComponent },
  // { path: 'about/:id', component: AboutDetailComponent },
  // { path: 'activities/:id', component: ActivityDetailComponent },
  // { path: 'news/:id', component: NewsDetailComponent },
  { path: 'aboutDetail', component: AboutDetailComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'weBuild', component: WeBuildComponent },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'userDashboard',
    component: UserDashboardComponent,
    canActivate: [EmpGuard],
  },
  {
    path: 'userDashboard/:userId',
    component: UserDashboardComponent,
    canActivate: [EmpGuard],
  },
  { path: 'payment', component: PaymentComponent },
  {
  path: 'payment/:amount',
  component: PaymentComponent
},
{ path: 'idcard', component: IdcardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 80], 
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
