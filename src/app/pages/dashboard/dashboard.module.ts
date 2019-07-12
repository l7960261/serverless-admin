import { NgModule } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { LicenseReportComponent } from './license-report/license-report.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CellAuthorizationsComponent } from './cells/cell-authorizations.component';
import { CellCustomComponent } from './cells/cell-custom.component';
import { CellEmailsComponent } from './cells/cell-emails.component';
import { CellIdComponent } from './cells/cell-id.component';
import { CellOperateComponent } from './cells/cell-operate.component';

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
