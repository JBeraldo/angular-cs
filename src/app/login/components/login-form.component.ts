import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HelperService } from 'src/app/common/helper.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginForm implements OnInit, OnDestroy {

  login_form:FormGroup;

  constructor(
    private auth_service: AuthService,
    private router: Router,
    private helper_service: HelperService
  ) {
    this.login_form = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  login(){
    this.auth_service.login(this.login_form.value).subscribe({
      next: () => this.router.navigateByUrl('/Dashboard'),
      error: () => this.helper_service.toast('danger','Credenciais Incorretas')
    })
  }
}
