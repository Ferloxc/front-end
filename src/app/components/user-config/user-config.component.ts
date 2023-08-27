import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api-service.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserModel } from 'src/models/user';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss'],
})
export class UserConfigComponent implements OnInit {
  private UserInfo: any;
  FirstName: string;
  LastName: string;
  // fullName: string = 'Fernando Cortes';
  email: string = 'fernando@example.com';
  currentPlan: string = 'Premium';
  editMode: boolean = false;

  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private api: ApiService
  ) {
    this.editForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      // plan: 'premium',
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData = async () => {
    try {
      const Userlogged = await this.authService.userLoggued();
      if (!Userlogged) this.router.navigate(['/login']);
      console.log(Userlogged);
      const { uid } = Userlogged.multiFactor.user;

      this.api.getUser(uid).then((result) => {
        this.UserInfo = result.data;
        const { Email, FirstName, LastName } = result.data;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.email = Email;
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  toggleEditMode() {
    this.editForm.setValue({
      firstName: this.FirstName,
      lastName: this.LastName,
    });
    this.editMode = !this.editMode;
  }

  async onEditSubmit() {
    const user = this.UserInfo;
    this.FirstName = this.editForm.get('firstName')?.value;
    this.LastName = this.editForm.get('lastName')?.value;
    user.FirstName = this.editForm.get('firstName')?.value;
    user.LastName = this.editForm.get('lastName')?.value;
    this.api.updateUser(user).then((result) => {
      if (result.data) alert('Datos Actualizados.');
      this.editMode = false;
    });
  }
}
