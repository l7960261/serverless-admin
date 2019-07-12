import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { get } from 'lodash';

@Component({
  template: `
    {{ renderValue }}
  `
})
export class CellCustomComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  constructor(
  ) { }

  ngOnInit() {
    this.renderValue = get(this.value, 'name');
  }
}