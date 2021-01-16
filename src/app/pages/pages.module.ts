import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {PagesComponent} from './pages.component';
import {IncrementadorComponent} from '../components/incrementador/incrementador.component';
import {GraficoDonaComponent} from '../components/grafico-dona/grafico-dona.component';
import {AccountSettingComponent} from './account-setting/account-setting.component';
import {PromesasComponent} from './promesas/promesas.component';
import {ProfileComponent} from './profile/profile.component';

// Modulos
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {PipesModule} from '../pipes/pipes.module';

// Rutas
import {PAGES_ROUTES} from './pages.routes';
import {RxjsComponent} from './rxjs/rxjs.component';
import {CommonModule} from '@angular/common';
import {UsuariosComponent} from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  providers: []
})

export class PagesModule {
}
