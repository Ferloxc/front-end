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
    let singUpForm = this.singUpForm.value;
    this.authService
      .SignUp(
        singUpForm.email!,
        singUpForm.password!,
        singUpForm.firstName!,
        singUpForm.lastName!
      )
      .then((result) => {
        if (result) {
          const uid = result?.user?.uid;
          const user = {
            UserId: uid,
            Email: singUpForm.email,
            FirstName: singUpForm.firstName,
            LastName: singUpForm.lastName,
          };
          this.api
            .createUser(user)
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        }
        console.log('result', result);
      });
  }
}
