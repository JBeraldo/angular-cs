import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HelperService } from 'src/app/common/helper.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginForm {
  @Output('pageChange') changePageEmitter: EventEmitter<string> = new EventEmitter<string>
  login_form:FormGroup;

  constructor(
    private auth_service: AuthService,
    private user_service: UserService,
    private router: Router,
    private helper_service: HelperService
  ) {
    this.login_form = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    })
  }

  login(){
    this.auth_service.login(this.login_form.value).subscribe({
      next: async () => {
        await firstValueFrom(this.user_service.getUser())
        this.router.navigateByUrl('/Dashboard')
      },
      error: () => this.helper_service.toast('danger','Credenciais Incorretas')
    })
  }

  toRegister(){
    this.changePageEmitter.emit('register')
  }
}
