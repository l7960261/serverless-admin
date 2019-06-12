import { NgModule } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';

const COMPONENTS = [
  PagesComponent,
]

@NgModule({
  imports: [
    ThemeModule,
    PagesRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class PagesModule { }
