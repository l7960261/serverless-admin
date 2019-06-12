import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { LicenseService } from '@core/services';
import { AUTHORIZATIONS, License } from '@core/models';

@Component({
  selector: 'authorizations-cell',
  templateUrl: './authorizations.component.html',
})
export class AuthorizationsComponent implements ICellRendererAngularComp, OnDestroy {
  authorizations = AUTHORIZATIONS;
  form: FormGroup;
  id: string;
  origin: boolean[]
  valueChanges$: Subscription;

  constructor(private fb: FormBuilder,
    private licenseService: LicenseService) {
  }

  ngOnDestroy(): void {
    this.valueChanges$.unsubscribe();
  }

  refresh(params: any): boolean {
    this.id = params.data.id;
    const data = params.data.authorizations as string[];
    const value = License.authorizationsToBoolArray(data);
    this.form.get('auths').setValue(value);
    this.origin = value;
    return true;
  }

  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.id = params.data.id;
    const data = params.data.authorizations as string[];
    const value = License.authorizationsToBoolArray(data);
    this.form = this.fb.group({
      auths: this.fb.array(value)
    });
    this.origin = value;
    this.onChanges();
  }
  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  }

  onChanges(): void {
    this.valueChanges$ = this.form.valueChanges.subscribe(val => {
      const auths = val.auths as boolean[];
      const needConfirm = !_.isEqual(this.origin, auths);

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
