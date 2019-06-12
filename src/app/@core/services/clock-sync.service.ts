import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';
import { interval } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';

@Injectable()
export class ClockSyncService {

  constructor(
    protected http: HttpClient,
  ) { }

  get formater() { return 'YYYY-MM-DD HH:mm:ss' }

  interval() {
    const numbers = interval(1000);
    return this.http.get('https://deliveryorder-b9b84.firebaseapp.com/api/v1/time/taipei')
      .pipe(
        combineLatest(numbers),
        map((res: Array<any>) =>
          dayjs(res[0].data)
            .add(res[1], 'second')
            .format(this.formater)),
      )
  }

  current() {
    return this.http.get('https://deliveryorder-b9b84.firebaseapp.com/api/v1/time/taipei')
      .pipe(
        map((res: any) => dayjs(res.data))
      )
      .toPromise();
  }
}
