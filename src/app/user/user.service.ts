import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService {
  public user:BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null)
  public user$:Observable<User | null> = this.user.asObservable()
  constructor(http: HttpClient) {
    super(http);
  }

  getUser(): Observable<any>{
    return this.get<User>('usuario')
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
