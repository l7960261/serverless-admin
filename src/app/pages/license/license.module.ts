import { NgModule } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { LicenseComponent } from './license.component';
import { LicenseRoutingModule } from './license-routing.module';
import { LicenseCreateAndEditComponent } from './license-create-and-edit/license-create-and-edit.component';
import { LicenseExtendComponent } from './license-extend/license-extend.component';

const COMPONENTS = [
  LicenseComponent,
  LicenseCreateAndEditComponent,
  LicenseExtendComponent,
];

const MODULES = [
  ThemeModule,
  LicenseRoutingModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class LicenseModule {
}
