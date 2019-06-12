import { NgModule, ModuleWithProviders } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';

import { ThemeModule } from '@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


const AUTH_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot().providers,
  AuthService,
  AuthGuard,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthRoutingModule,
    NbAuthModule,
  ],
  declarations: [
    LoginComponent,
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AuthModule,
      providers: [
        ...AUTH_CORE_PROVIDERS,
      ],
    };
  }
}
