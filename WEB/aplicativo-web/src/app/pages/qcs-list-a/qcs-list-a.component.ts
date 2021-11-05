import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import { QuejasService } from 'src/app/services/quejas.service';

@Component({
  selector: 'app-qcs-list-a',
  templateUrl: './qcs-list-a.component.html',
  styleUrls: ['./qcs-list-a.component.scss'],
})
export class QcsListAComponent implements OnInit {

  public quejas:any = [];
  estado = "Aprobado";
  pageActual: number= 1;
  filterpost='';
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

    const user = JSON.parse(localStorage.getItem('user'));
    this.id = user.uid;
    this.cargarUsuario();
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
        this.serviceStore.getQCSAprobadas().subscribe((r)=>{
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
          this.serviceStore.getQCSMiasAprobadas(electrolinera[0].name).subscribe(misquejas=>{
            console.log(misquejas);
            this.quejas= misquejas.map(i =>
              {
              this.quejas = i.payload.doc.data() as {}; 
              const id = i.payload.doc.id; 
              return {id, ...this.quejas} 
              }      
            )
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

  // aprobar(documentId){
  //   this.serviceStore.aprobarQCS(documentId).then(() => {
  //     console.log('Queja Aprobada!');
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  // rechazar(documentId){
  //   this.serviceStore.RechazarQCS(documentId).then(() => {
  //     console.log('Queja Rechazada!');
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  GetTodas(){
    this.router.navigate(['panel/qcs']);
  }
  
  GetRechazadas(){
    this.router.navigate(['panel/qcsr']);
  }

  ver(documentId){
    this.router.navigate(['panel/qcsver',documentId]);
  }
  
}
