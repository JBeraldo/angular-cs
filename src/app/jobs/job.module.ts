import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobPage } from './create-jobs/create-job.page';
import { CreateJobPageModule } from './create-jobs/create-job.module';


const routes: Routes = [
  {
    path: 'Store',
    component: CreateJobPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJobPageModule,
    RouterModule.forChild(routes)
  ],
})
export class JobModule {}
