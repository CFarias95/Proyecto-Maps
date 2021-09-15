import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Electrolinera } from 'src/app/modelm/electrolinera';
import { AdminService } from 'src/app/services/admin.service';
import { ElectrolineraService } from 'src/app/services/electolinera.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
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
  id: string;
  tipo: string;
  nombre; string;
  electro : Electrolinera;

  constructor(
    private serviceStore: QuejasService,
    private router: Router,
    public atrCtrl: AlertController,
    private route: ActivatedRoute,
    private Servicio: AdminService,  
    private lectroservicio: FirebasestorageService,
    private serviceAuth : FirebaseauthService ) {
      this.serviceAuth.getCurrentUser().then(r=>{
        this.id = r.uid;
        console.log("ID: "+this.id);
        if (this.id){
          this.Servicio.getAdministrador(this.id).subscribe(administrador => {
            this.tipo = administrador.tipo;
            console.log("Tipo: "+this.tipo);
            if(this.tipo.startsWith("Admin")){
              this.serviceStore.getQCS().subscribe((r)=>{
                this.quejas= r.map(i =>
                 {
                 this.quejas = i.payload.doc.data() as {}; 
                 const id = i.payload.doc.id; 
                 return {id, ...this.quejas} 
                 }      
                )
              });  
            }else{
              this.lectroservicio.obtenerElectrolineraIdUser(this.id).subscribe(electrolinera => {
                console.log(electrolinera);
          
                this.serviceStore.getQCSMias(electrolinera[0].name).subscribe(misquejas=>{
                  console.log(misquejas);
                  this.quejas = misquejas;
                });
      
              });
              
            }
          });
        } 
      });
    }


  ngOnInit() {
    
  }
  //cargar datos de usuario
  //Cargar usuario
 
   // CREAR UN METODO PARA OBTENER TODAS LAS quejas
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
