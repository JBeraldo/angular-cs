import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLogged) {
      this.router.navigate(['Login']);
      return false;
    }
    return true;
  }}
