import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subject,} from 'rxjs';
import { JobService } from '../job.service';
import { Job } from '../job';

@Component({
  selector: 'app-list-jobs',
  templateUrl: './list-jobs.page.html',
  styleUrls: ['./list-jobs.page.scss'],
})
export class ListJobsPage implements OnInit,OnDestroy{
  private activatedRoute = inject(ActivatedRoute);
  private ngUnsubscribe = new Subject<void>();
  public profile!: string;
  public jobs:Array<Job> = []
  constructor(
    private menu_controller: MenuController,
    private job_service: JobService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.profile = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu_controller.enable(true)
    this.job_service.getJobs().subscribe({next: (data) => this.jobs = data})
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }

  createJob(){
    this.router.navigateByUrl('/Job/Store')
  }
}
