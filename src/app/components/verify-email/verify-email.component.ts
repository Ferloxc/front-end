import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {

  public constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated().subscribe(res => {
      if (res && res.uid && res?.emailVerified) {
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
      };
    });
  }

  ngOnInit() {
  }

  redirectLogin() {
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
}
