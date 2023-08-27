import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from 'src/app/services/apiService/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  singUpForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    this.api
      .getUser('64e6e15bf3431f010ae8e1fa')
      .then((data) => console.log(data));
    var singUpForm = this.singUpForm.value;
    this.authService.SignUp(
      singUpForm.email!,
      singUpForm.password!,
      singUpForm.firstName!,
      singUpForm.lastName!
    );
  }
}
