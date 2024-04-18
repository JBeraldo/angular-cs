import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService {

  public user = null

  constructor(http: HttpClient) {
    super(http);
  }

  getUser(): Observable<any>{
    return this.get('usuario').pipe(tap((user)=> this.user = user))
  }

  logout(): Observable<any>{
    return this.post('logout',{})
    .pipe(tap(() => localStorage.removeItem('token')))
  }

  get userLogger(){
    return this.user !== null
  }
}
