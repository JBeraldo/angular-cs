import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/common/helper.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterForm implements OnInit,OnDestroy{
  @Output('pageChange') changePageEmitter: EventEmitter<string> = new EventEmitter<string>
  private ngUnsubscribe:Subject<void> = new Subject<void>()

  type:BehaviorSubject<"candidate"| "company"> = new BehaviorSubject<"candidate"| "company">('candidate')
  type$:Observable<"candidate"| "company"> = this.type.asObservable();
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

  ngOnInit(): void {
    this.watchUserType()
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  watchUserType(){
    this.type$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (type) =>{
        if(type === "company"){
          this.register_form.addControl('ramo', new FormControl(''))
          this.register_form.addControl('descricao', new FormControl(''))
          return
        }
        this.register_form.removeControl('ramo')
        this.register_form.removeControl('descricao')
      }
    })
  }

  register(){
    let observable$
    if(this.type.getValue() === 'candidate'){
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
