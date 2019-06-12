import { NgModule } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { LicenseReportComponent } from './license-report/license-report.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

const COMPONENTS = [
  DashboardComponent,
  LicenseReportComponent,
];

const MODULES = [
  ThemeModule,
  DashboardRoutingModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class DashboardModule { }
