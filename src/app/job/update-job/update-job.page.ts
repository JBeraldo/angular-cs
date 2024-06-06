import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common/helper.service';
import { BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import { SkillService } from 'src/app/skill/skill.service';
import { Skill, SkillData } from 'src/app/skill/skill';
import { JobService } from '../job.service';
import { JobSectorService } from 'src/app/job-sector/job-sector.service';
import { JobSector } from 'src/app/job-sector/job-sector';
import { Job, JobData } from '../job';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.page.html',
  styleUrls: ['./update-job.page.scss'],
})
export class UpdateJobPage implements OnInit,OnDestroy{
  private ngUnsubscribe = new Subject<void>();
  public profile!: string;
  private activatedRoute = inject(ActivatedRoute);

  public job:BehaviorSubject<Job> = new BehaviorSubject<Job>(new Job({} as JobData))

  public job_form:FormGroup;

  public job_sectors$:Observable<Array<JobSector>>
  public skills$:Observable<Array<Skill>>

  constructor(
    private menu_controller: MenuController,
    private job_service: JobService,
    private skills_service: SkillService,
    private job_sector_service: JobSectorService,
    private router: Router,
    private helper_service: HelperService,
  ) {
    this.skills$ = skills_service.skills$
    this.job_sectors$ = job_sector_service.job_sectors$
    this.job_form = this.buildForm()
  }

  ngOnInit() {
    this.profile = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu_controller.enable(true)
    this.skills_service.getSkills().subscribe()
    this.job_sector_service.getJobSectors().subscribe()
    this.job_service.getJobs().subscribe()
    this.get()
  }

  buildForm(){
    return new FormGroup({
      id: new FormControl(null),
      titulo: new FormControl(''),
      descricao: new FormControl(''),
      salario_min: new FormControl(0),
      salario_max: new FormControl(null),
      experiencia: new FormControl(0),
      ativo: new FormControl(true),
      ramo_id: new FormControl(null),
      competencias: new FormArray([]),
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }

  get job_skills(){
    return this.job_form.get('competencias') as FormArray;
  }

  get(){
    this.job_service.findJob(parseInt(this.profile)).subscribe({
      next: (job:Job) =>{
        this.job.next(job)
        this.job_form.controls['id'].setValue(job.id)
        this.job_form.controls['titulo'].setValue(job.titulo)
        this.job_form.controls['descricao'].setValue(job.descricao)
        this.job_form.controls['salario_min'].setValue(job.salario_min)
        this.job_form.controls['salario_max'].setValue(job.salario_max)
        this.job_form.controls['experiencia'].setValue(job.experiencia)
        this.job_form.controls['ativo'].setValue(job.ativo)
        this.job_form.controls['ramo_id'].setValue(job.ramo.id)

        for(let skill of job.competencias){
          this.job_skills.push(new FormControl(skill))
        }
      }
    })
  }

  update(){
    if(!this.job_form.valid){
      return
    }
    this.job_service.updateJob(this.job_form.value).subscribe()
  }

  delete(){
    this.job_service.deleteJob(this.job_form.value.id).subscribe()
    this.router.navigateByUrl('Job/List')
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
