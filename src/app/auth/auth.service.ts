import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CommonService {

  constructor(http: HttpClient) {
    super(http);
  }

  login(login_data:any): Observable<any>{
    let login_response = this.post('login',login_data
    ,{})
    .pipe(
      tap({next(value) {
          localStorage.setItem('token',value.token)
      },})
    )

    this.logged.next('logged')

    return login_response
  }

  logout(): void{
    this.post('logout',{}).subscribe({complete: () => this.logged.next('logout')})
  }

  get hasToken(){
    return this.token() !== null
  }

  kick(){
    localStorage.removeItem('token')
    this.logged.next('logout')
  }
}
