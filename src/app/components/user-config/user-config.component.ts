import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent {
  fullName: string = 'Fernando Cortes';
  email: string = 'fernando@example.com';
  currentPlan: string = 'Premium';
  editMode: boolean = false;

  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      plan: 'premium',
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onEditSubmit() {
   
  }

}
