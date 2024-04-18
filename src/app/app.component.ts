import { Component, Signal, computed } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { HelperService } from './common/helper.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/Dashboard', icon: 'mail' },
    { title: 'Perfil', url: '/User', icon: 'person' },
  ];
  public avatar_imgs: Array<string> = ['assets/images/gato_joia.jpg','assets/images/gato_fodasse.jpg']
  public avatar:Signal<string> = computed(()=> this.avatar_imgs[Math.round(Math.random())])
  constructor(
    private auth_service : AuthService,
    private router: Router,
  ) {}


  logout(){
    this.auth_service.logout()
  }
}
