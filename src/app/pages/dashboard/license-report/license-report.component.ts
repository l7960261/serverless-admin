import { Component, OnInit } from '@angular/core';
import { LicenseService } from '@core/services';
import { Observable } from 'rxjs';
import { License } from '@core/models';
import { GridOptions } from 'ag-grid-community';
import { map } from 'rxjs/operators';
import { AuthorizationsComponent } from '@theme/components/cell/authorizations/authorizations.component';
import { EmailsComponent } from '@theme/components/cell/emails/emails.component';
import { KeyComponent } from '@theme/components/cell/key/key.component';
import { OperateComponent } from '@theme/components/cell/operate/operate.component';

@Component({
  selector: 'app-license-report',
  templateUrl: './license-report.component.html',
})
export class LicenseReportComponent implements OnInit {
  rowData: Observable<License[]>;
  gridOptions: GridOptions;

  constructor(private liceneseService: LicenseService) { }

  ngOnInit() {
    this.rowData = this.liceneseService
      .getLicenses()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as License;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );

    this.gridOptions = <GridOptions>{
      columnDefs: [
        { headerName: 'Key', field: 'id', width: 300, cellRendererFramework: KeyComponent },
        { headerName: '功能', field: 'authorizations', cellRendererFramework: AuthorizationsComponent },
        { headerName: 'Emails', field: 'emails', cellRendererFramework: EmailsComponent },
        { headerName: '姓名', field: 'custom.name', width: 75 },
        { headerName: '創建時間', field: 'createdAt', sortable: true },
        { headerName: '過期時間', field: 'expiredAt', sortable: true },
        { headerName: '操作', field: 'operate', cellRendererFramework: OperateComponent }
      ],
      context: {
        componentParent: this
      },
      rowHeight: 50
    }
  }
}
