import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CommonService } from 'src/app/common/common.service';
import { Skill, SkillData} from './skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService extends CommonService {
  private skills:BehaviorSubject<Array<Skill>> = new BehaviorSubject<Array<Skill>>([])
  public skills$:Observable<Array<Skill>> = this.skills.asObservable()
  constructor(http: HttpClient) {
    super(http);
  }

  getSkills(): Observable<any>{
    return this.get<Array<Skill>>('competencias').pipe(tap((skills:Array<SkillData>) => this.setSkills(skills)))
  }
  private setSkills(skills:Array<Skill>){
    this.skills.next(skills)
  }
}
