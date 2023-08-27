import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public isAuth: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.authService.isAuthenticated().subscribe((res) => {
          this.isAuth = res && res.uid ? true : false;
        });
      });
  }

  ngOnInit(): void {}

  SignOut() {
    this.authService.SignOut();
  }
}
