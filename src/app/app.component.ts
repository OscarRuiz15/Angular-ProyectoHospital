import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SettingsService} from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'clitest';

  constructor(private translate: TranslateService, public _ajustes: SettingsService) {
    translate.setDefaultLang('es');
  }
}
