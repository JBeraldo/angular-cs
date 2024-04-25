import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { User, UserData } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService {
  public user:BehaviorSubject<User> = new BehaviorSubject<User>(new User({} as UserData))
  public user$:Observable<User> = this.user.asObservable()
  constructor(http: HttpClient) {
    super(http);
  }

  getUser(): Observable<any>{
    return this.get<User>('usuario').pipe(map(user => new User(user)),tap(user=> this.setUser(user)))
  }

  getUserValue(): User{
    return this.user.getValue();
  }

  setUser(user:User){
    this.user.next(user)
  }

  storeCandidate(user_data:User): Observable<any>{
    return this.post<User>('usuarios/candidato',user_data,{})
  }
  storeCompany(user_data:User): Observable<any>{
    return this.post<User>('usuarios/empresa',user_data,{})
  }
}
