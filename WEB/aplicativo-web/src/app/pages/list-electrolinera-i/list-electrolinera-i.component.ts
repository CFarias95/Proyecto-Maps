import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';

@Component({
  selector: 'app-list-electrolinera-i',
  templateUrl: './list-electrolinera-i.component.html',
  styleUrls: ['./list-electrolinera-i.component.scss'],
})
export class ListElectrolineraIComponent implements OnInit {

  public electrolinera:any = [];
  public documentId = null;
  public estado = "Inactivo"

  constructor(
    private serviceStore: FirebasestorageService, 
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.GetElectrolinera();
  }

  public GetElectrolinera() {
    this.serviceStore.ObtenerElectrolineras().subscribe((r)=>{
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
      this.mensajeerror('Electrolinera eliminada !');
    }, (error) => {
      console.error(error);
      this.mensajeerror('No se pudo eliminar la Electrolinera');
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

public GetActivas(){
  this.router.navigate(['panel/electroa']);
}

public GetTodos(){
  this.router.navigate(['panel/list-electrolinera']);
}

}
