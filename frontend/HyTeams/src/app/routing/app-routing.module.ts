import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { TeamsComponent } from '../components/teams/teams.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BuildProjectComponent } from '../components/build-project/build-project.component';
import { MyTeamComponent } from '../components/my-team/my-team.component';
import { ActivateComponent } from '../components/activate/activate.component';
import { RegisterSuccessComponent } from '../components/register-success/register-success.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ReportComponent } from '../components/report/report.component';

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
