import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../auth.service'
import { UserService } from 'src/app/user/user.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(public auth: AuthService,private user_service:UserService, public router: Router) {
    this.auth.logged.subscribe({next: (value)=> {
      if(value == 'logout'){
        localStorage.removeItem('token')
        this.router.navigateByUrl('/Login')
      }
    }})
  }

  async canActivate(): Promise<boolean> {
    if (!this.auth.hasToken) {
      this.router.navigate(['Login']);
      return false;
    }

    if(this.auth.logged.getValue() == 'none' && this.auth.hasToken){
      firstValueFrom(this.user_service.getUser()).catch(
        ()=> {
        this.router.navigate(['Login']);
        localStorage.removeItem('token')
        return false;
      })
    }

    return true;
  }}
