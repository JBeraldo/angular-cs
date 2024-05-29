import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed} from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient
  ) {}


  protected get<T>(partial_url:string, header:HttpHeaders = this.header()): Observable<any>{
    return this.http.get<T>(
      this.buildUrl(partial_url),{headers: header}
    )
  }

  protected post<T>(partial_url:string,data:any, header:any = this.header()): Observable<any>{
    return this.http.post<T>(
      this.buildUrl(partial_url),data,{headers: header}
    )
  }

  protected put<T>(partial_url:string,data:any, header:any = this.header()): Observable<any>{
    return this.http.put<T>(
      this.buildUrl(partial_url),data,{headers: header}
    )
  }

  protected delete<T>(partial_url:string,header:any = this.header()): Observable<any>{
    return this.http.delete<T>(
      this.buildUrl(partial_url),{headers: header}
    )
  }

  protected buildUrl(partial_url:string): string{
    return `${environment.apiHost}${partial_url}`
  }

  protected token(){
    return localStorage.getItem('token')
  }

  protected header(){
    return new HttpHeaders({'authorization': `Bearer ${this.token()}`})
  }
}
