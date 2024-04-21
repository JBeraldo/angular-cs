import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  public currentPage:BehaviorSubject<string> = new BehaviorSubject<string>('login')
  constructor(
    private menu_controller: MenuController
  ) {}

  ionViewWillEnter(){
    this.menu_controller.enable(false)
  }

  ngOnDestroy(): void {
    this.menu_controller.enable(true)
  }

  changePage(page:string){
    console.log(page)
    this.currentPage.next(page)
  }
}
