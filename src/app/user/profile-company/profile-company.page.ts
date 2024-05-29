import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/common/helper.service';
import { BehaviorSubject, first, Observable, Subject, Subscription, takeUntil, tap} from 'rxjs';
import { User } from '../user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './profile-company.page.html',
  styleUrls: ['./profile-company.page.scss'],
})
export class ProfileCompanyPage implements OnInit,OnDestroy{
  public profile!: string;
  private activatedRoute = inject(ActivatedRoute);
  public user_form:FormGroup;
  public user$:Observable<User|null>;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private menu_controller: MenuController,
    private user_service: UserService,
    private auth_service: AuthService,
    private helper_service: HelperService
  ) {
    this.user$ = user_service.user$
    this.user_form = new FormGroup({
      email: new FormControl(''),
      nome: new FormControl(''),
      senha: new FormControl(null),
      ramo: new FormControl(''),
      descricao: new FormControl('')
    })
  }

  ngOnInit() {
    this.profile = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu_controller.enable(true)
    this.get()
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }

  get(){
    this.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (user) => {
        this.user_form.controls['nome'].setValue(user?.nome)
        this.user_form.controls['email'].setValue(user?.email)
        this.user_form.controls['ramo'].setValue(user?.ramo)
        this.user_form.controls['descricao'].setValue(user?.descricao)
      },
      error: (error) => this.helper_service.handleError(error)
    })
    this.user_service.getUser()
  }

  update(){
    this.user_service.updateUser(this.user_form.value).subscribe({next: () => {
      this.user_service.getUser().subscribe();
    }})
  }

  delete(){
    this.user_service.deleteUser().subscribe({next: () => {
      this.auth_service.kick();
    }})
  }
}
