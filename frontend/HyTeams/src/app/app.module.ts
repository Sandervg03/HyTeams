import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './components/website structure/main/app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/website structure/header/header.component';
import { FooterComponent } from './components/website structure/footer/footer.component';
import { AboutUsComponent } from './components/website information/about-us/about-us.component';
import { TeamsComponent } from './components/teams/all-teams/teams.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserRegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BuildProjectComponent } from './components/website information/build-project/build-project.component';
import { MyTeamComponent } from './components/teams/my-team/my-team.component';
import { ActivateComponent } from './components/user/activate/activate.component';
import { RegisterSuccessComponent } from './components/user/register-success/register-success.component';
import { ContactComponent } from './components/website information/contact/contact.component';
import { ReportComponent } from './components/website information/report/report.component';
import { TeamRegisterComponent } from './components/teams/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    TeamsComponent,
    LoginComponent,
    UserRegisterComponent,
    ProfileComponent,
    BuildProjectComponent,
    MyTeamComponent,
    ActivateComponent,
    RegisterSuccessComponent,
    ContactComponent,
    ReportComponent,
    TeamRegisterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
