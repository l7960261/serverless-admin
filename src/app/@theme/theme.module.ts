import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import {
  NbThemeModule,
  NbLayoutModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSidebarModule,
  NbMenuModule,
  NbActionsModule,
  NbUserModule,
  NbContextMenuModule,
  NbSelectModule,
  NbBadgeModule,
  NbCardModule,
  NbIconModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { SampleLayoutComponent } from './layouts/sample/sample.layout';
import {
  HeaderComponent,
  FooterComponent,
} from './components';

const BASE_MODULES = [
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

const NB_MODULES = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSidebarModule,
  NbMenuModule,
  NbActionsModule,
  NbUserModule,
  NbContextMenuModule,
  NbSelectModule,
  NbBadgeModule,
  NbCardModule,
  NbIconModule,
  Ng2SmartTableModule,
];

const THIRD_PARTY_MODULES = [
  ClipboardModule,
];

const COMPONENTS = [
  SampleLayoutComponent,
  HeaderComponent,
  FooterComponent,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot({ name: 'default' }).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
];

@NgModule({
  imports: [
    ...BASE_MODULES,
    ...NB_MODULES,
    ...THIRD_PARTY_MODULES,
  ],
  exports: [
    ...BASE_MODULES,
    ...NB_MODULES,
    ...THIRD_PARTY_MODULES,
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        ...NB_THEME_PROVIDERS,
      ],
    };
  }
}
