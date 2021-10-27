import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QcsService } from 'src/app/services/qcs.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
})
export class NotificacionesComponent implements OnInit {

  id:string;
  constructor(
    private localNotifications: LocalNotifications,
    private servicio: QcsService, 
    private user: AuthenticationService,
    ) { }

  ngOnInit() {
    this.user.userDetails().subscribe(usuario => {
      this.id = usuario.uid;
      //this.quejasRechazadas();
      this.servicio.getMisQCSNumTodas(this.id).subscribe(data=> {
        if(data?.length){  
        for (let index = 0; index < data.length; index++) {
          //this.presentAlert(data[index].Estado,texto);
          const titulo = "ELQ Notifica que";
          const texto = "Tú " + data[index].Tipo + " a "+ data[index].Origen + " fue "+ data[index].Estado;
          this.createNotify(titulo,texto);
          this.servicio.updateMisQCS(data[index].id);
        }}
      });
      
    });
  }

  createNotify(titulo : string, texto: string) {
    // Schedule a single notification
    this.localNotifications.schedule({
      title: titulo ,
      text: texto,
      led: 'FF0000',
    });
  }

}
