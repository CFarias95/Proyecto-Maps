import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuejasService } from 'src/app/services/quejas.service';

@Component({
  selector: 'app-qcs-list',
  templateUrl: './qcs-list.component.html',
  styleUrls: ['./qcs-list.component.scss'],
})
export class QcsListComponent implements OnInit {

  pageActual: number= 1;
  public quejas:any = [];
  filterpost ='';

  constructor(
    private serviceStore: QuejasService,
    private router: Router,
    public atrCtrl: AlertController ) { }

  ngOnInit() {
    this.obtenerQuejas();
  }

   // CREAR UN METODO PARA OBTENER TODAS LAS quejas
   public obtenerQuejas() {
    this.serviceStore.getQCS().subscribe((r)=>{
      this.quejas= r.map(i =>
       {
       this.quejas = i.payload.doc.data() as {}; 
       const id = i.payload.doc.id; 
       return {id, ...this.quejas} 
       }      
      )
    })  
  }

  aprobar(documentId){
    this.serviceStore.aprobarQCS(documentId).then(() => {
      console.log('Queja Aprobada!');
    }, (error) => {
      console.error(error);
    });
  }

  async rechazar(documentId){

    let alert = this.atrCtrl.create({
      header: 'Rechazar',
      inputs: [
        {
          name: 'razon',
          placeholder: 'Razon del rechazo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('You Clicked on Cancel');
          }
        },
        {
          text: 'Rechazar',
          handler: data => {
            if (data.razon != '') {
              console.log(data.razon);
              this.serviceStore.RechazarQCS(documentId,data.razon ).then(() => {
                console.log('Queja Rechazada!');
              }, (error) => {
                console.error(error);
              });

            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    
    (await alert).present();

  }

  GetAprobadas(){
    this.router.navigate(['panel/qcsa']);
  }
  
  GetRechazadas(){
    this.router.navigate(['panel/qcsr']);
  }

  ver(documentId){
    this.router.navigate(['panel/qcsver',documentId]);
  }
  
}
