import { Component, OnDestroy} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {
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
    this.currentPage.next(page)
  }
}
