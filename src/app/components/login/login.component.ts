import { Component, OnInit, Input } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  loggedIn: boolean;
  signInForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(res => {
      if (res && res.uid) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    var login = this.signInForm.value;
    this.authService.SignIn(login.username!, login.password!);
  }
}
