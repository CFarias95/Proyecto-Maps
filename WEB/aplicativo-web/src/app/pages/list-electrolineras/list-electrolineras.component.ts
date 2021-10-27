import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import { ElectrolinerasComponent } from '../electrolineras/electrolineras.component';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import {  MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import {Electrolinera} from '../../modelm/electrolinera';


@Component({
  providers:[ElectrolinerasComponent ],
  selector: 'app-list-electrolineras',
  templateUrl: './list-electrolineras.component.html',
  styleUrls: ['./list-electrolineras.component.scss'],
})
export class ListElectrolinerasComponent implements OnInit {


  public electrolinera:any = [];
  public documentId = null;
  public currentStatus = 1;
  myFormElectro: FormGroup;
  boton:string="Agregar";
  public visible = true;
  public mostrar = false;
  pageActual: number= 1;
  filterpost = '';
  estado = "Inactivo";
  
  constructor(
    private serviceStore: FirebasestorageService, 
    private comp: ElectrolinerasComponent,
    private alertCtrl: AlertController,
    private router: Router, ) {}

  ngOnInit() {

    this.GetElectrolinera();
    this.myFormElectro = new FormGroup({
      nameF: new FormControl(''),
      direccionF: new FormControl(''),
      referenciaF: new FormControl(''),
      tipoconectorF: new FormControl(''),
      numeroconectoresF: new FormControl(''),
      imagenF: new FormControl(''),
      LunesF:new FormControl(''),
      MartesF: new FormControl(''),
      MiercolesF: new FormControl(''),
      JuevesF:new FormControl(''),
      ViernesF: new FormControl(''),
      SabadoF:new FormControl(''),
      DomingoF:new FormControl(''),
      formaspagoF:new FormControl(''),
      latitudF:new FormControl(''),
      longitudF:new FormControl(''),
      estadoF:new FormControl(''),
      idF: new FormControl('')
   });
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

  // DESACTIVAR ELECTROLINERA
  async eliminarElectrolinera(documentId){
      let alert = this.alertCtrl.create({
        header: 'Deshabilitar',
        message: '¿Seguro que quieres deshabilar la electrolinera?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancelaste la operacion');
            }
          },
          {
            text: 'Aceptar',
            handler: data => {
                
              this.serviceStore.eliminarElectrolinera(documentId).then(() => {
                this.mensajeerror('Electrolinera desactivada!');
              }, (error) => {
                console.error(error);
                this.mensajeerror('No se pudo desactivar la electrolinera');
              });
  
            }
          }
        ]
      });
      
      (await alert).present();
  
    }

   // AVTIVAR ELECTROLINERA
   public HabilitarElectrolinera(documentId) {
    this.serviceStore.activarElectrolinera(documentId).then(() => {
      this.mensajeerror('Electrolinera activada!');
    }, (error) => {
      console.error(error);
      this.mensajeerror('No se pudo activar la electrolinera');
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

  public GetInactivas(){
    this.router.navigate(['panel/electroi']);
  }

}
