import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseComponent } from './license.component';
import { LicenseCreateAndEditComponent } from './license-create-and-edit/license-create-and-edit.component';
import { LicenseExtendComponent } from './license-extend/license-extend.component';

const routes: Routes = [
  {
    path: '',
    component: LicenseComponent,
    children: [
      { path: 'create', component: LicenseCreateAndEditComponent },
      { path: 'edit/:id', component: LicenseCreateAndEditComponent },
      { path: 'extend/:id', component: LicenseExtendComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
