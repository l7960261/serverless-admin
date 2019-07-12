import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <button nbButton hero size="tiny" ngxClipboard [cbContent]="renderValue">Copy</button>
    {{ renderValue }}
  `
})
export class CellIdComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  constructor(
  ) { }

  ngOnInit() {
    this.renderValue = this.value as string;
  }
}