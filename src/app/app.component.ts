import { Component, OnInit, Inject } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { APP_THEME_KEY } from '@core/core.config';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private themeService: NbThemeService,
    @Inject(APP_THEME_KEY) private tKey,
  ) { }

  ngOnInit(): void {
    this.initTheme();
  }

  initTheme() {
    const themeName = localStorage.getItem(this.tKey);

    if (themeName) {
      this.themeService.changeTheme(themeName);
    }
  }
}
