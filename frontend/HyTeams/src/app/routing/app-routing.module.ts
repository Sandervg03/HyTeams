import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutUsComponent } from '../components/website information/about-us/about-us.component';
import { TeamsComponent } from '../components/teams/all-teams/teams.component';
import { LoginComponent } from '../components/user/login/login.component';
import { RegisterComponent } from '../components/user/register/register.component';
import { ProfileComponent } from '../components/user/profile/profile.component';
import { BuildProjectComponent } from '../components/website information/build-project/build-project.component';
import { MyTeamComponent } from '../components/teams/my-team/my-team.component';
import { ActivateComponent } from '../components/user/activate/activate.component';
import { RegisterSuccessComponent } from '../components/user/register-success/register-success.component';
import { ContactComponent } from '../components/website information/contact/contact.component';
import { ReportComponent } from '../components/website information/report/report.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'build-project', component: BuildProjectComponent },
  { path: 'my-team', component: MyTeamComponent },
  { path: 'activate', component: ActivateComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'report', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
