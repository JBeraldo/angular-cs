import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { JobData } from './job';

@Injectable({
  providedIn: 'root'
})
export class JobService extends CommonService {
  constructor(http: HttpClient) {
    super(http);
  }

  storeJob(job_data:JobData): Observable<any>{
    return this.post('vagas',job_data)
  }

  updateJob(job_data:JobData): Observable<any>{
    return this.put(`vagas/${job_data.id}`,job_data)
  }

  deleteJob(job_id:Number): Observable<any>{
    return this.delete(`vagas/${job_id}`)
  }

  findJob(job_id:Number): Observable<any>{
    return this.get(`vagas/${job_id}`)
  }

  getJobs(): Observable<any>{
    return this.get<Array<JobData>>(`vagas`)
  }
}
