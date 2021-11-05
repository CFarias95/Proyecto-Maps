import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Notificaciones } from '../modelm/notificaciones';
import { AuthenticationService } from './authentication.service';
import { QcsService } from './qcs.service';
import { NotificacionesService } from './notificaciones.service';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notifyCollection: AngularFirestoreCollection<Notificaciones>;
  private notifyCollection2: AngularFirestoreCollection<Notificaciones>;
  private Notify: Observable<any>;
  private Notify2: Observable<Notificaciones[]>;
  filterpost = new Date().toISOString();
  id:string;

  constructor(
    public localNotifications : LocalNotifications,
    private firestore: AngularFirestore,
    private user: AuthenticationService,
    private servicio: QcsService, 
    private notificaciones: NotificacionesService
  ) {
    this.inicializar();
   }

   inicializar(){

    console.log("Se inicializo el servicio de notificaciones");

     this.user.userDetails().subscribe(usuario => {
      this.id = usuario.uid;
      console.log("usuario ACtual: "+this.id);
      this.servicio.getMisQCSNumTodas(this.id).subscribe(data=> {
        if(data.length > 0){  
        for (let index = 0; index < data.length; index++) {
          //this.presentAlert(data[index].Estado,texto);
          const titulo = "ELQ notifica que";
          const texto = "Tu " + data[index].Tipo + " a "+ data[index].Origen + " esta en estado "+ data[index].Estado;
          this.createNotify(titulo,texto,index+1);
          this.servicio.updateMisQCS(data[index].id);
        }
        
      }else{
          console.log("usuario ACtual: "+this.id +" no tiene notificciones pendientes");
        }
      });
    });

    //if (this.id){
      this.notificaciones.getNoticias().subscribe(res =>{
        if(res.length > 0){
          const titulo = "Noticias en ELQ";
          const texto = "Tienes nuevas noticias por revisar" ;
          this.createNotify(titulo,texto,20);
        }
      });
  
      this.notificaciones.getPromociones().subscribe(res =>{
        if(res.length > 0){
          const titulo = "Promociones en ELQ";
          const texto = "Tienes nuevas promociones por revisar" ;
          this.createNotify(titulo,texto,30);
        }
      });
   // }
    
  }

  createNotify(titulo : string, texto: string, id:number) {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: id,
      title: titulo ,
      text: texto,
      led: 'FF0000',
    });
    
  }

}
