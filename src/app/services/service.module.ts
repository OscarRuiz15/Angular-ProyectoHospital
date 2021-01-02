import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginGuardGuard, SettingsService, SharedService, SidebarService, SwalService, UsuarioService} from './service.index';
import {HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SwalService,
    LoginGuardGuard,
    HttpClient
  ]
})
export class ServiceModule {
}
