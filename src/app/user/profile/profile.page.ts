import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MenuController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/common/helper.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit,OnDestroy {
  public profile!: string;
  public user$:BehaviorSubject<User|null>;
  private activatedRoute = inject(ActivatedRoute);
  public user_form:FormGroup;

  constructor(
    private authService: AuthService,
    private menu_controller: MenuController,
    private user_service: UserService,
    private helper_service: HelperService
  ) {
    this.user$ = user_service.user$
    this.user_form = new FormGroup({
      email: new FormControl(''),
      nome: new FormControl('')
    })
  }

  ngOnInit() {
    this.profile = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu_controller.enable(true)
    this.get()
  }
  ngOnDestroy(): void {
      this.user$.unsubscribe();
  }

  get(){
    this.user$.subscribe({
      next: (user) => {
        this.user_form.controls['nome'].setValue(user?.nome)
        this.user_form.controls['email'].setValue(user?.email)
      },
      error: (err) => this.helper_service.responseErrors(err)
    })
    this.user_service.getUser()
  }
}
