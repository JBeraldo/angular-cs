import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  token:Signal<string | null> = computed(()=> localStorage.getItem('token'))
  header:Signal<HttpHeaders> = computed(() => new HttpHeaders({'authorization': `Bearer ${this.token()}`}))

  constructor(private http: HttpClient
  ) { }


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
}
