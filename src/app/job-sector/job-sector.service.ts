import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { JobSector, JobSectorData } from './job-sector';

@Injectable({
  providedIn: 'root'
})
export class JobSectorService extends CommonService {
  private job_sectors:BehaviorSubject<Array<JobSector>> = new BehaviorSubject<Array<JobSector>>([])
  public job_sectors$:Observable<Array<JobSector>> = this.job_sectors.asObservable()
  constructor(http: HttpClient) {
    super(http);
  }

  getJobSectors(): Observable<any>{
    return this.get<Array<JobSectorData>>('ramos').pipe(tap(sectors => this.setJobSectors(sectors)))
  }

  setJobSectors(sectors:Array<JobSector>){
    this.job_sectors.next(sectors)
  }
}
