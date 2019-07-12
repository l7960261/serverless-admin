import { NgModule } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { LicenseReportComponent } from './license-report/license-report.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {
  CellIdComponent,
  CellAuthorizationsComponent,
  CellEmailsComponent,
  CellCustomComponent,
  CellOperateComponent,
} from './cells';

const COMPONENTS = [
  DashboardComponent,
  LicenseReportComponent,
  CellAuthorizationsComponent,
  CellCustomComponent,
  CellEmailsComponent,
  CellIdComponent,
  CellOperateComponent,
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
  entryComponents: [
    CellAuthorizationsComponent,
    CellCustomComponent,
    CellEmailsComponent,
    CellIdComponent,
    CellOperateComponent,
  ],
})
export class DashboardModule { }
