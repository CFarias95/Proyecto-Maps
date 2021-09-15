import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import { QuejasService } from 'src/app/services/quejas.service';

@Component({
  selector: 'app-qcs-list-r',
  templateUrl: './qcs-list-r.component.html',
  styleUrls: ['./qcs-list-r.component.scss'],
})
export class QcsListRComponent implements OnInit {

  public quejas:any = [];
  estado = "Rechazado";
  pageActual: number= 1;
  filterpost = '';
  id: string;
  tipo: string;
  nombre; string;

  constructor(
    private serviceStore: QuejasService,
    private router: Router,
    private Servicio: AdminService,  
    private lectroservicio: FirebasestorageService,
    private serviceAuth : FirebaseauthService
  ) {
    this.serviceAuth.getCurrentUser().then(r=>{
      this.id = r.uid;
      if (this.id){
        this.cargarUsuario();
      } 
    });
   }

  ngOnInit() {
    //this.obtenerQuejas();
  }
   //cargar datos de usuario
  //Cargar usuario
  async cargarUsuario(){
    this.Servicio.getAdministrador(this.id).subscribe(administrador => {
      this.tipo = administrador.tipo;
      if(this.tipo.startsWith("Admin")){
        this.serviceStore.getQCSRechazadas().subscribe((r)=>{
          this.quejas= r.map(i =>
           {
           this.quejas = i.payload.doc.data() as {}; 
           const id = i.payload.doc.id; 
           return {id, ...this.quejas} 
           }      
          )
        })  
      }else{
        this.lectroservicio.obtenerElectrolineraIdUser(this.id).subscribe(electrolinera => {
          console.log(electrolinera[0].name);
          this.serviceStore.getQCSMiasRechazadas(electrolinera[0].name).subscribe(misquejas=>{
            console.log(misquejas);
          });

        });
        
      }
    });
  }


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


  GetTodas(){
    this.router.navigate(['panel/qcs']);
  }

  
  GetAprobadas(){
    this.router.navigate(['panel/qcsa']);
  }

  ver(documentId){
    this.router.navigate(['panel/qcsver',documentId]);
  }
  

}
