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
    return this.post('login',login_data
    ,{})
    .pipe(
      tap((response) => {
        localStorage.setItem('token',response.token)
      })
    )
  }

  logout(): Observable<any>{
    return this.post('logout',{})
    .pipe(tap(() => localStorage.removeItem('token')))
  }

  get isLogged(){
    return this.token() !== null
  }
}
