import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'emails-cell',
  templateUrl: './emails.component.html',
})
export class EmailsComponent implements ICellRendererAngularComp {
  id: string;
  count: number;
  email: string;

  constructor() { }

  refresh(params: any): boolean {
    this.id = params.data.id;
    const data = params.data.emails as string[] || [];
    this.count = data.length;
    this.email = data[0];
    return true;
  }

  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.id = params.data.id;
    const data = params.data.emails as string[] || [];
    this.count = data.length;
    this.email = data[0];
  }

  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  }
}
