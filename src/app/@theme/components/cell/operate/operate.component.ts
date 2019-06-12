import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";

@Component({
  selector: 'operate-cell',
  templateUrl: './operate.component.html',
})
export class OperateComponent implements ICellRendererAngularComp {
  id: string;

  constructor() { }

  refresh(params: any): boolean {
    this.id = params.data.id;
    return true;
  }

  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.id = params.data.id;
  }

  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  }

}

