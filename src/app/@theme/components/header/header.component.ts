import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService, NbMenuService, NbThemeService } from '@nebular/theme';
import { ClockSyncService } from '@core/services';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { APP_THEME_KEY } from '@core/core.config';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  now: string;
  name: string;
  currentTheme: string;
  subscription$ = new Subscription();

  items = [
    { title: 'Logout' },
  ];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  constructor(
    protected sidebarService: NbSidebarService,
    protected clockSyncService: ClockSyncService,
    protected authService: AuthService,
    private nbMenuService: NbMenuService,
    private themeService: NbThemeService,
    private router: Router,
    @Inject(APP_THEME_KEY) private tKey,
  ) { }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
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
    this.router.navigate(['/']);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    localStorage.setItem(this.tKey, themeName);
  }

}
