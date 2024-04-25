import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCandidatePage } from './profile-candidate/profile-candidate.page';
import { ProfileCandidatePageModule } from './profile-candidate/profile-candidate.module';
import { ProfileCompanyPage } from './profile-company/profile-company.page';
import { ProfileCompanyPageModule } from './profile-company/profile-company.module';


const routes: Routes = [
  {
    path: 'Candidate',
    component: ProfileCandidatePage
  },
  {
    path: 'Company',
    component: ProfileCompanyPage
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileCandidatePageModule,
    ProfileCompanyPageModule,
    RouterModule.forChild(routes)
  ],
})
export class UserModule {}
