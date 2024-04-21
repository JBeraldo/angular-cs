import { Component, Signal, computed } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './user/user';
import { HelperService } from './common/helper.service';
import { UserService } from './user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public avatar_imgs: Array<string> = ['assets/images/gato_joia.jpg','assets/images/gato_fodasse.jpg']
  public avatar:Signal<string> = computed(()=> this.avatar_imgs[Math.round(Math.random())])

  public user$:Observable<User | null>

  public appPages = [
    { title: 'Dashboard', url: '/Dashboard', icon: 'mail' },
    { title: 'Perfil', url: '/User', icon: 'person' },
  ];
  constructor(
    private auth_service : AuthService,
    private user_service: UserService,
    private helper_service: HelperService
  ) {
    this.user$ = this.user_service.user$
  }

  logout(){
    this.auth_service.logout().subscribe({
      error: (error) => this.helper_service.handleError(error),
    })
  }
}
