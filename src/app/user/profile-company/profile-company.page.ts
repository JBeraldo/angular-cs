import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/common/helper.service';
import { BehaviorSubject, first, Observable, Subscription} from 'rxjs';
import { User } from '../user';

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
  public userChanges$:Subscription = new Subscription();
  constructor(
    private menu_controller: MenuController,
    private user_service: UserService,
    private helper_service: HelperService
  ) {
    this.user$ = user_service.user$
    this.user_form = new FormGroup({
      email: new FormControl(''),
      nome: new FormControl(''),
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
    this.userChanges$.unsubscribe()
  }

  get(){
    this.userChanges$ = this.user$.subscribe({
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
}
