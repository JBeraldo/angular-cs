import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable, Subject, firstValueFrom, takeUntil } from 'rxjs';
import { User } from './user/user';
import { HelperService } from './common/helper.service';
import { UserService } from './user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy{
  public avatar_imgs: Array<string> = ['assets/images/gato_joia.jpg']
  public avatar:Signal<string> = computed(()=> this.avatar_imgs[0])

  public user$:Observable<User | null>
  public appPages:Subject<Array<any>> = new Subject<Array<any>>

  private ngUnsubscribe = new Subject<void>();
  constructor(
    private auth_service : AuthService,
    private user_service: UserService,
    private helper_service: HelperService
  ) {
    this.user$ = this.user_service.user$
  }

  ngOnInit(){
    this.user_service.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (user) => this.resolveAppPages(user)
    })
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logout(){
    this.auth_service.logout().subscribe({
      error: (error) => this.helper_service.handleError(error),
    })
  }

  resolveAppPages(user:User){
    if(user.tipo === "empresa"){
      this.appPages.next([
        { title: 'Dashboard', url: '/Dashboard', icon: 'mail' },
        { title: 'Perfil', url: '/User/Company', icon: 'person' },
        { title: 'Vagas', url: '/Job/List', icon: 'construct' },
      ])
    }
    else{
      this.appPages.next([
        { title: 'Dashboard', url: '/Dashboard', icon: 'mail' },
        { title: 'Perfil', url: '/User/Candidate', icon: 'person' },
      ])
    }

  }
}
