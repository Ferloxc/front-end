import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { CodingComponent } from './components/coding/coding.component';
import { SnippetComponent } from './components/snippet/snippet.component';
import { ManagerComponent } from './components/manager/manager.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'code', component: CodingComponent }, 
    { path: 'snip', component: SnippetComponent },
    { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard] }, 
    { path: 'verify-email', component: VerifyEmailComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
