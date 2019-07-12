import { Component, OnInit } from '@angular/core';
import { LicenseService } from '@core/services';
import { Observable, Subscription } from 'rxjs';
import { License } from '@core/models';
import { GridOptions } from 'ag-grid-community';
import { map } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthorizationsComponent } from '@theme/components/cell/authorizations/authorizations.component';
import { EmailsComponent } from '@theme/components/cell/emails/emails.component';
import { KeyComponent } from '@theme/components/cell/key/key.component';
import { OperateComponent } from '@theme/components/cell/operate/operate.component';
import { CellIdComponent } from '../cells/cell-id.component';
import { CellAuthorizationsComponent } from '../cells/cell-authorizations.component';
import { CellEmailsComponent } from '../cells/cell-emails.component';
import { CellCustomComponent } from '../cells/cell-custom.component';
import { CellOperateComponent } from '../cells/cell-operate.component';

@Component({
  selector: 'app-license-report',
  templateUrl: './license-report.component.html',
})
export class LicenseReportComponent implements OnInit {

  rowData: Observable<License[]>;
  gridOptions: GridOptions;
  subscription$ = new Subscription();
  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'Key',
        type: 'custom',
        renderComponent: CellIdComponent,
      },
      authorizations: {
        title: '功能',
        type: 'custom',
        renderComponent: CellAuthorizationsComponent,
      },
      emails: {
        title: 'Emails',
        type: 'custom',
        renderComponent: CellEmailsComponent,
      },
      custom: {
        title: '姓名',
        type: 'custom',
        renderComponent: CellCustomComponent,
      },
      createdAt: {
        title: '創建時間',
        type: 'string',
      },
      expiredAt: {
        title: '過期時間',
        type: 'string',
      },
      operate: {
        title: '操作',
        type: 'custom',
        renderComponent: CellOperateComponent,
      },
    },
    pager: {
      display: false
    }
  };
  source: LocalDataSource = new LocalDataSource();

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

    this.subscription$
      .add(
        this.rowData
          .subscribe(
            (data) => {
              this.source.load(data);
            }
          )
      );
  }
}
