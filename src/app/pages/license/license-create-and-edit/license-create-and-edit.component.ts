import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { License, AUTHORIZATIONS } from '@core/models';
import { ClockSyncService, LicenseService } from '@core/services';

@Component({
  selector: 'app-license-create-and-edit',
  templateUrl: './license-create-and-edit.component.html',
})
export class LicenseCreateAndEditComponent implements OnInit, OnDestroy {
  auths = AUTHORIZATIONS;
  options = _.range(1, 31);
  licenseId: string;
  subscription: Subscription;
  createMode = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private licenseService: LicenseService,
    private timeService: ClockSyncService
  ) { }

  get emails(): FormArray { return this.form.get('emails') as FormArray; }
  get authorizations(): FormArray { return this.form.get('authorizations') as FormArray; }

  ngOnInit() {
    this.subscription = new Subscription();
    this.subscription.add(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.licenseId = params.get('id');
        if (this.licenseId) {
          this.createMode = false;
          this.getLicense();
        }

        this.form = this.fb.group({
          custom: this.fb.group({
            name: this.fb.control('', [Validators.compose([Validators.maxLength(30), Validators.required])])
          }),
          emails: this.fb.array([
            this.fb.control('', [Validators.email]),
          ]),
          authorizations: this.fb.array([
            this.fb.control(true),
            this.fb.control(false),
            this.fb.control(false)
          ]),
          period: this.fb.control(1, [Validators.required]),
          unit: ['month', Validators.required]
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLicense() {
    this.subscription.add(
      this.licenseService
        .getLicense(this.licenseId)
        .pipe(
          map(actions => {
            const data = actions.payload.data() as License;
            const id = actions.payload.id
            return { id, ...data };
          })
        )
        .subscribe(data => {
          this.form.controls['custom'].get('name').setValue(data.custom.name);
          this.form.get('authorizations').setValue(License.authorizationsToBoolArray(data.authorizations));
          // Gets all but the first element of data.authorizations
          _.tail(data.emails)
            .forEach(() => this.addEmail());
          this.form.get('emails').setValue(data.emails);
        })
    );
  }

  async createLicense(data: License) {
    const unit = this.form.get('unit').value;
    const period = parseInt(this.form.get('period').value, 10);
    const current = await this.timeService.current();
    const createdAt = current.format(this.timeService.formater);
    const expiredAt = current.add(period, unit).format('YYYY-MM-DD HH:mm:ss');
    const license = Object.assign(data, {
      createdAt,
      expiredAt
    });
    await this.licenseService.createLicense(license);
    this.router.navigate(['/']);
  }

  async updateLicense(data: License) {
    const license = Object.assign(data, { id: this.licenseId });
    await this.licenseService.updateLicense(license);
    this.router.navigate(['/']);
  }

  async onSubmit() {
    if (this.form.invalid) {
      alert('表單資訊有誤');
      return;
    }

    if (this.form.valid) {
      const emails = _.compact(this.form.get('emails').value);
      const custom = this.form.get('custom').value;
      const authorizations = License.authorizationsFromBoolArray(this.form.get('authorizations').value);
      const license = { emails, custom, authorizations };

      if (this.createMode) {
        await this.createLicense(license);
      } else {
        await this.updateLicense(license);
      }
    }
  }

  addEmail() { this.emails.push(this.fb.control('', [Validators.email])); }

  removeEmail(index: number) {
    if (this.emails.length == 1) {
      return;
    }

    this.emails.removeAt(index);
  }
}
