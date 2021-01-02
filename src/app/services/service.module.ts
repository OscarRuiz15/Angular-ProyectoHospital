import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  LoginGuardGuard,
  SettingsService,
  SharedService,
  SidebarService,
  SubirArchivoService,
  SwalService,
  UsuarioService
} from './service.index';
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
    SubirArchivoService,
    HttpClient
  ]
})
export class ServiceModule {
}
