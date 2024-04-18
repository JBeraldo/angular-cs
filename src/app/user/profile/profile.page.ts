import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MenuController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/common/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profile!: string;
  public user_form:FormGroup
  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private authService: AuthService,
    private menu_controller: MenuController,
    private user_service: UserService,
    private helper_service: HelperService
  ) {
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

  get(){
    this.user_service.getUser().subscribe({
      next: (response) => {
        this.user_form.controls['nome'].setValue(response.nome)
        this.user_form.controls['email'].setValue(response.email)
      },
      error: (err) => this.helper_service.responseErrors(err)
    })
  }
}
