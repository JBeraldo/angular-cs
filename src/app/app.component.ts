import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/Dashboard', icon: 'mail' },
  ];
  constructor(
    private auth_service : AuthService,
    private router: Router
  ) {}


  logout(){
    this.auth_service.logout().subscribe({complete: () => this.router.navigateByUrl('/Login') });
  }
}
