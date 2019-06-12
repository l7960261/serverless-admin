import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbSidebarService, NbMenuService } from '@nebular/theme';
import { ClockSyncService } from '@core/services';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  now: string;
  name: string;
  subscription$ = new Subscription();
  items = [
    { title: 'Logout' },
  ];

  constructor(
    protected sidebarService: NbSidebarService,
    protected clockSyncService: ClockSyncService,
    protected authService: AuthService,
    private nbMenuService: NbMenuService,
  ) { }

  ngOnInit() {
    this.subscription$.add(this.onIntervalHandle());
    this.subscription$.add(this.onUserDetailChange());
    this.subscription$.add(this.onMenuItemClick());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onIntervalHandle() {
    return this.clockSyncService
      .interval()
      .subscribe(data => {
        this.now = data;
      });
  }

  onUserDetailChange() {
    return this.authService
      .userDetails
      .subscribe(details => this.name = details.displayName);
  }

  onMenuItemClick() {
    return this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        this.authService.logout();
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
  }

}
