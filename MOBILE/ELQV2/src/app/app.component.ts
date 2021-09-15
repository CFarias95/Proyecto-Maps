import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Notificaciones } from './modelm/notificaciones';
import { NotificacionesService } from './services/notificaciones.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  notify: Notificaciones;
  
  constructor( ) {}


}
