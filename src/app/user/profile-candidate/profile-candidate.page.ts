import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/common/helper.service';
import { Observable, Subject, Subscription, takeUntil} from 'rxjs';
import { User } from '../user';
import { AuthService } from 'src/app/auth/auth.service';
import { SkillService } from 'src/app/skill/skill.service';
import { Skill, SkillData } from 'src/app/skill/skill';
import { ExperienceData } from 'src/app/experience/experience';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './profile-candidate.page.html',
  styleUrls: ['./profile-candidate.page.scss'],
})
export class ProfileCandidatePage implements OnInit,OnDestroy{
  public profile!: string;
  private activatedRoute = inject(ActivatedRoute);
  public user_form:FormGroup;
  public user$:Observable<User>;
  public skills$:Observable<Array<Skill>>
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private menu_controller: MenuController,
    private user_service: UserService,
    private auth_service: AuthService,
    private skills_service: SkillService,
    private helper_service: HelperService,
    private fb: FormBuilder
  ) {
    this.user$ = user_service.user$
    this.skills$ = skills_service.skills$
    this.user_form = new FormGroup({
      email: new FormControl(''),
      nome: new FormControl(''),
      senha: new FormControl(null),
      competencias: new FormArray([]),
      experiencia: new FormArray([])
    })
  }

  ngOnInit() {
    this.profile = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu_controller.enable(true)
    this.skills_service.getSkills().subscribe()
    this.get()
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }

  get user_skills(){
    return this.user_form.get('competencias') as FormArray;
  }

  get user_experiences(){
    return this.user_form.get('experiencia') as FormArray;
  }

  get(){
    this.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (user) => {

        this.user_form.controls['nome'].setValue(user?.nome)
        this.user_form.controls['email'].setValue(user?.email)
        for(let skill of user?.competencias){
          this.user_skills.push(new FormControl(skill))
        }
        this.user_experiences.clear()
        user?.experiencia.forEach((xp: ExperienceData) => {
          this.user_experiences.push(this.createExperienceFormGroup(xp));
        });
      },
      error: (error) => this.helper_service.handleError(error)
    })
    this.user_service.getUser()
  }

  createExperienceFormGroup(data?: ExperienceData): FormGroup {
    return this.fb.group({
      id: [data?.id],
      nome_empresa: [data?.nome_empresa],
      inicio: [data?.inicio],
      fim: [data?.fim || null],
      cargo: [data?.cargo]
    });
  }

  update(){
    this.user_service.updateUser(this.user_form.value).subscribe({next: () => {
      this.user_service.getUser().subscribe();
    }})
  }

  delete(){
    this.user_service.deleteUser().subscribe({next: () => {
      this.auth_service.kick();
    }})
  }

  toggleSkill(list_skill:Skill){
    let exists = this.user_skills.value.find((skill:SkillData) => skill.id == list_skill.id)
    if(exists != undefined){
      let index = this.user_skills.value.indexOf(exists)
      this.user_skills.removeAt(index)
      return
    }
    this.user_skills.push(new FormControl(list_skill))
  }


  addExperience() {
    this.user_experiences.push(this.createExperienceFormGroup());
  }

  removeExperience(index: number) {
    this.user_experiences.removeAt(index);
  }

  userHasSkill(id:number){
    return !!this.user_skills.value.find((skill:SkillData) => skill.id == id)
  }
}
