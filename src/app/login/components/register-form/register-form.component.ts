import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/common/helper.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterForm {
  @Output('pageChange') changePageEmitter: EventEmitter<string> = new EventEmitter<string>
  type:string = 'candidate'
  register_form:FormGroup;

  constructor(
    private user_service: UserService,
    private router: Router,
    private helper_service: HelperService
  ) {
    this.register_form = new FormGroup({
      nome:  new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl('')
    })
  }

  register(){
    let observable$
    if(this.type === 'candidate'){
      observable$ = this.user_service.storeCandidate(this.register_form.value)
    }
    else{
      observable$ = this.user_service.storeCompany(this.register_form.value)
    }
    observable$.subscribe({
      next: (response) => {
        this.helper_service.handleMessage(response)
        this.toLogin()
      },
      error: (error) => this.helper_service.handleError(error)
    })
  }

  toLogin(){
    this.changePageEmitter.next('login')
  }
}
