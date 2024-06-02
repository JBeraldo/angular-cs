import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { User, UserData } from './user';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService {
  private user:BehaviorSubject<User> = new BehaviorSubject<User>(new User({} as UserData))
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
    if(user_data.senha != null){
      user_data.senha = Md5.hashStr(user_data.senha)
    }
    return this.post<User>('usuarios/candidatos',user_data,{})
  }
  storeCompany(user_data:User): Observable<any>{
    if(user_data.senha != null){
      user_data.senha = Md5.hashStr(user_data.senha)
    }
    return this.post<User>('usuarios/empresa',user_data,{})
  }
  updateUser(user_data:UserData): Observable<any>{
    if(user_data.senha != null){
      user_data.senha = Md5.hashStr(user_data.senha)
    }
    return this.put<User>('usuario',user_data)
  }
  deleteUser(): Observable<any>{
    return this.delete('usuario')
  }
}
