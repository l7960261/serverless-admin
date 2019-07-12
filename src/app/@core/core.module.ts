import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthModule } from '../auth/auth.module';
import { APP_THEME_KEY } from './core.config';
import { environment } from '../../environments/environment';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ClockSyncService, LicenseService } from './services';

const APP_CORE_PROVIDERS = [
  ...AuthModule.forRoot().providers,
  ClockSyncService,
  LicenseService,
];

const FS_CORE_PROVIDERS = [
  ...AngularFireModule.initializeApp(environment.firebaseConfig).providers
]

const FIREBASE_MODULES = [
  AngularFireAuthModule,
  AngularFirestoreModule,
];

@NgModule({
  imports: [
    FIREBASE_MODULES,
  ],
  exports: [
    FIREBASE_MODULES,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...APP_CORE_PROVIDERS,
        ...FS_CORE_PROVIDERS,
        { provide: APP_THEME_KEY, useValue: '_epa_theme' },
      ],
    };
  }
}
