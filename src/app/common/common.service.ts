import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed} from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  logged:BehaviorSubject<string> = new BehaviorSubject<string>('none')
  constructor(private http: HttpClient
  ) {}


  get(partial_url:string, header:HttpHeaders = this.header()): Observable<any>{
    return this.http.get(
      this.buildUrl(partial_url),{headers: header}
    )
  }

  post(partial_url:string,data:any, header:any = this.header()): Observable<any>{
    return this.http.post(
      this.buildUrl(partial_url),data,{headers: header}
    )
  }

  buildUrl(partial_url:string): string{
    return `${environment.apiHost}${partial_url}`
  }

  token(){
    return localStorage.getItem('token')
  }

  header(){
    return new HttpHeaders({'authorization': `Bearer ${this.token()}`})
  }
}
