import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';

@Component({
  selector: 'app-list-electrolinera-a',
  templateUrl: './list-electrolinera-a.component.html',
  styleUrls: ['./list-electrolinera-a.component.scss'],
})
export class ListElectrolineraAComponent implements OnInit {

  public electrolinera:any = [];
  public documentId = null;
  public estado = "Activo";
  pageActual: number= 1;
  filterpost ='';

  constructor(
    private serviceStore: FirebasestorageService, 
    
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.GetElectrolinera();
    
  }
  public GetElectrolinera() {
    this.serviceStore.ObtenerElectrolinerasActivas().subscribe((r)=>{
      this.electrolinera= r.map(i =>
       {
       this.electrolinera = i.payload.doc.data() as {}; 
       const id = i.payload.doc.id; 
       return {id, ...this.electrolinera} 
       }      
      )
    })  
  }

  // ELIMINAR ELECTROLINERA
  public eliminarElectrolinera(documentId) {
    this.serviceStore.eliminarElectrolinera(documentId).then(() => {
      this.mensajeerror('Electrolinera desactivada!');
    }, (error) => {
      console.error(error);
      this.mensajeerror('No se pudo desactivar la electrolinera');
    });
  }

   //mostramos mensajes
   async mensajeerror(mensajetxt: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: mensajetxt,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

 public  reEditElectrolinera(documentId){

    this.router.navigate(['panel/editelectrolinera',documentId]);
  }

  public GetInactivas(){
    this.router.navigate(['panel/electroi']);
  }
  
  public GetTodos(){
    this.router.navigate(['panel/list-electrolinera']);
  }


}
