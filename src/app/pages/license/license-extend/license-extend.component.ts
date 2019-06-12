import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';

import { LicenseService } from '@core/services';
import { License } from '@core/models';

@Component({
  selector: 'app-license-extend',
  templateUrl: './license-extend.component.html',
})
export class LicenseExtendComponent implements OnInit, OnDestroy {
  options = _.range(1, 31);
  subscription: Subscription;
  licenseId: string;
  form: FormGroup;
  name: string;
  expiredAt: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private liceseService: LicenseService
  ) { }

  async ngOnInit() {
    this.subscription = new Subscription();
    this.subscription.add(
      this.route.paramMap
        .subscribe((params: ParamMap) => {
          this.licenseId = params.get('id');
          if (this.licenseId) {
            this.subscription.add(
              this.liceseService.getLicense(this.licenseId)
                .pipe(
                  map(actions => {
                    const data = actions.payload.data() as License;
                    const id = actions.payload.id
                    return { id, ...data };
                  })
                )
                .subscribe(data => {
                  this.name = data.custom.name;
                  this.expiredAt = data.expiredAt;
                })
            );
          }

          this.form = this.fb.group({
            period: this.fb.control(1, [Validators.required]),
            unit: ['month', Validators.required]
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onSubmit() {
    if (this.form.invalid) {
      alert('表單資訊有誤');
      return;
    }

    if (this.form.valid) {
      const unit = this.form.get('unit').value;
      const expiredAt = dayjs(this.expiredAt)
        .add(this.form.get('period').value, unit)
        .format('YYYY-MM-DD HH:mm:ss');
      const id = this.licenseId;
      const license = {
        id,
        expiredAt
      }

      await this.liceseService.updateLicense(license);
      this.router.navigate(['/']);
    }
  }

}
