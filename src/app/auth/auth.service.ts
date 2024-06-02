import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CommonService {
  private logged:BehaviorSubject<string> = new BehaviorSubject<string>('none')
  logged$:Observable<string> = this.logged.asObservable()

  constructor(http: HttpClient) {
    super(http);
  }

  login(login_data:any): Observable<any>{
    login_data.senha = Md5.hashStr(login_data.senha)
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

  logout(): Observable<any>{
    let logout_response = this.post('logout',{})

    this.logged.next('logout')

    return logout_response
  }

  get hasToken(){
    return this.token() !== null
  }

  kick(){
    localStorage.removeItem('token')
    this.logged.next('logout')
  }

  setLogged(){
    this.logged.next('logged')
  }

  setLogout(){
    this.logged.next('logout')
  }
}
