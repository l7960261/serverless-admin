import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { isEqual } from 'lodash';
import { AUTHORIZATIONS, License } from '@core/models';
import { LicenseService } from '@core/services';

@Component({
  template: `
  <form [formGroup]="form" class="form-inline">
    <nb-checkbox *ngFor="let auth of form.controls.auths['controls']; let i=index" [formControl]="auth">
      {{authorizations[i].text}}
    </nb-checkbox>
  </form>
  `
})
export class CellAuthorizationsComponent implements ViewCell, OnInit, OnDestroy {

  authorizations = AUTHORIZATIONS;
  form: FormGroup;
  id: string;
  origin: boolean[]
  valueChanges$: Subscription;

  @Input() value: any;
  @Input() rowData: any;

  constructor(
    private fb: FormBuilder,
    private licenseService: LicenseService,
  ) { }

  ngOnInit() {
    this.id = this.rowData.id;
    const data = this.value as string[];
    const value = License.authorizationsToBoolArray(data);
    this.form = this.fb.group({
      auths: this.fb.array(value)
    });
    this.origin = value;
    this.onChanges();
  }

  ngOnDestroy(): void {
    this.valueChanges$.unsubscribe();
  }

  onChanges(): void {
    this.valueChanges$ = this.form.valueChanges.subscribe(val => {
      const auths = val.auths as boolean[];
      const needConfirm = !isEqual(this.origin, auths);

      if (needConfirm) {
        if (confirm('確定修改嗎? ')) {
          const data = License.authorizationsFromBoolArray(auths);
          this.licenseService.updateLicense({
            id: this.id,
            authorizations: data
          });
        } else {
          // Restore form value
          this.form.get('auths').setValue(this.origin);
        }
      }
    });
  }
}