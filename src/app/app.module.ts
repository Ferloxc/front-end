import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodingComponent } from './components/coding/coding.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { ManagerComponent } from './components/manager/manager.component';
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ApiService } from './services/apiService/api-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    CodingComponent,
    SnippetComponent,
    ManagerComponent,
    NavbarComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
