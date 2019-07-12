import { Component, OnInit } from '@angular/core';
import { LicenseService } from '@core/services';
import { Subscription } from 'rxjs';
import { License } from '@core/models';
import { map } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import {
  CellIdComponent,
  CellAuthorizationsComponent,
  CellEmailsComponent,
  CellCustomComponent,
  CellOperateComponent,
} from '../cells';

@Component({
  selector: 'app-license-report',
  templateUrl: './license-report.component.html',
})
export class LicenseReportComponent implements OnInit {

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

    this.subscription$
      .add(
        this.liceneseService
          .getLicenses()
          .pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as License;
              const id = a.payload.doc.id;
              return { id, ...data };
            })),
          )
          .subscribe(
            (data) => {
              this.source.load(data);
            }
          )
      );
  }
}
