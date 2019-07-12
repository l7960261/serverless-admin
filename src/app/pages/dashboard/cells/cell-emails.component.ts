import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { head } from 'lodash';

@Component({
  template: `
    <span class="badge badge-pill badge-success">{{count}}</span>
    {{ renderValue }}
  `
})
export class CellEmailsComponent implements ViewCell, OnInit {

  count: number;
  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  constructor(
  ) { }

  ngOnInit() {
    this.count = this.value.length;
    this.renderValue = head(this.value);
  }
}