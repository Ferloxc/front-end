import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable, first, map, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) {}

  isAuthorized: boolean = true;

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const logged = await this.authService.userLoggued();

    if (!logged) {
      this.router.navigate(['login']);
    }
    
    return true;
  }
}

