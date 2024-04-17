import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private auth_service: AuthService,
    private menu_controller: MenuController
  ) {}

  ionViewWillEnter(){
    this.menu_controller.enable(false)
  }

  ngOnDestroy(): void {
    this.menu_controller.enable(true)
  }
}
