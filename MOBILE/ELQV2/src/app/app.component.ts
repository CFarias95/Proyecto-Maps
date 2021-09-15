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
  
  constructor(
    private localNotifications: LocalNotifications,
    private notificaciones : NotificacionesService ) {

      this.notificaciones.getTodo().subscribe(data=>{
        data.forEach(element => {
          console.log(element);
          if(element.imagen != ""){
            this.localNotifications.schedule({
              title: element.titulo,
              text: element.texto,
              attachments: element.imagen,
              icon: 'https://firebasestorage.googleapis.com/v0/b/integracion-maps-304321.appspot.com/o/image%20(4).png?alt=media&token=d81337f2-1125-4cb6-8f22-0dc8c7d328cd',
              trigger: {at: new Date(new Date(element.fecha))},
              led: 'FF0000',
              sound: null
           });
          }
          
        });
      });
    }


}
