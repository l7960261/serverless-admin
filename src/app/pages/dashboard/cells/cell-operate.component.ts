import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <button nbButton size="tiny" ghost [routerLink]="['/pages/license/edit', id]">Edit</button>
    <button nbButton size="tiny" ghost [routerLink]="['/pages/license/extend', id]">Extend</button>
  `
})
export class CellOperateComponent implements ViewCell, OnInit {

  id: string;

  @Input() value: any;
  @Input() rowData: any;

  constructor(
  ) { }

  ngOnInit() {
    this.id = this.rowData.id;
  }
}