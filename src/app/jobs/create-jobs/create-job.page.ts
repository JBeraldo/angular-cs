import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common/helper.service';
import { Observable, Subject, takeUntil} from 'rxjs';
import { SkillService } from 'src/app/skill/skill.service';
import { Skill, SkillData } from 'src/app/skill/skill';
import { JobService } from '../job.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit,OnDestroy{
  public profile!: string;
  private activatedRoute = inject(ActivatedRoute);
  public job_form:FormGroup;
  public skills$:Observable<Array<Skill>>
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private menu_controller: MenuController,
    private job_service: JobService,
    private skills_service: SkillService,
    private helper_service: HelperService,
  ) {
    this.skills$ = skills_service.skills$
    this.job_form = new FormGroup({
      titulo: new FormControl(''),
      descrição: new FormControl(''),
      salario_min: new FormControl(0),
      salario_max: new FormControl(null),
      experiencia: new FormControl(0),
      ativo: new FormControl(true),
      ramo_id: new FormControl(null),
      competencias: new FormArray([]),
    })
  }

  ngOnInit() {
    this.profile = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu_controller.enable(true)
    this.skills_service.getSkills().subscribe()
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }

  get job_skills(){
    return this.job_form.get('competencias') as FormArray;
  }

  store(){
    if(!this.job_form.valid){
      return
    }
    this.job_service.storeJob(this.job_form.value).subscribe()
  }

  delete(){
    this.job_service.deleteJob(this.job_form.value.id).subscribe()
  }

  toggleSkill(list_skill:Skill){
    let exists = this.job_skills.value.find((skill:SkillData) => skill.id == list_skill.id)
    if(exists != undefined){
      let index = this.job_skills.value.indexOf(exists)
      this.job_skills.removeAt(index)
      return
    }
    this.job_skills.push(new FormControl(list_skill))
  }

  userHasSkill(id:number){
    return !!this.job_skills.value.find((skill:SkillData) => skill.id == id)
  }
}
