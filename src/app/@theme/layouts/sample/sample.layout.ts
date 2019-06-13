import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService, NbThemeService, NbMediaBreakpointsService, NbSidebarService, NbMediaBreakpoint } from '@nebular/theme';
import { withLatestFrom, delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sample-layout',
  templateUrl: './sample.layout.html',
  styleUrls: ['./sample.layout.scss']
})
export class SampleLayoutComponent implements OnInit, OnDestroy {
  subscription$ = new Subscription();

  constructor(
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
  ) { }

  ngOnInit() {
    const isBp = this.bpService.getByName('is');

    this.subscription$.add(
      this.menuService.onItemSelect()
        .pipe(
          withLatestFrom(this.themeService.onMediaQueryChange()),
          delay(20),
        )
        .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

          if (bpTo.width <= isBp.width) {
            this.sidebarService.collapse('menu-sidebar');
          }
        })
    );

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
