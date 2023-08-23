import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { CodingComponent } from './components/coding/coding.component';
import { SnippetComponent } from './components/snippet/snippet.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'code', component: CodingComponent }, 
    { path: 'snip', component: SnippetComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
