import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService {

  public user$ = new BehaviorSubject<User|null>(null)

  constructor(http: HttpClient) {
    super(http);
  }

  getUser(): Observable<any>{
    return this.get<User>('usuario').pipe(tap((user)=> this.user$.next(user)))
  }

  logout(): Observable<any>{
    return this.post('logout',{})
    .pipe(tap(() => localStorage.removeItem('token')))
  }
}
