import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobPage } from './create-jobs/create-job.page';
import { CreateJobPageModule } from './create-jobs/create-job.module';
import { ListJobsPage } from './list-jobs/list-jobs.page';
import { ListJobsPageModule } from './list-jobs/list-jobs.module';
import { UpdateJobPageModule } from './update-job/update-job.module';
import { UpdateJobPage } from './update-job/update-job.page';


const routes: Routes = [
  {
    path: 'Store',
    component: CreateJobPage
  },
  {
    path: 'List',
    component: ListJobsPage
  },
  {
    path: 'Update/:id',
    component: UpdateJobPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJobPageModule,
    ListJobsPageModule,
    UpdateJobPageModule,
    RouterModule.forChild(routes)
  ],
})
export class JobModule {}
