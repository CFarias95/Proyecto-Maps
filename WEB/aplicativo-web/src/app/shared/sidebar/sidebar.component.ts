import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { Router } from '@angular/router'
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { DatosUsuario } from 'src/app/modelm/user.interface';
import { AdminService } from '../../services/admin.service';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario:DatosUsuario;
  uidElectro : string;
  nombre : string;
  imagen: string;
  uid : string;
  tipo : string;
  admintipo = "Admin";

  constructor(
    private serviceAuth : FirebaseauthService, 
    private serviceElectro : FirebasestorageService, 
    private router: Router, 
    private Servicio: AdminService) { }

  ngOnInit(): void {
    
    this.serviceAuth.getCurrentUser().then(r=>{
      this.uid = r.uid;
      //console.log(this.uid);
      this.Servicio.getAdministrador(this.uid).subscribe(administrador => {
        this.usuario = administrador;
        this.imagen = administrador.foto;
        this.nombre = administrador.nombres;
        this.tipo = administrador.tipo;
        console.log(this.tipo);
        if(this.tipo != 'Admin'){
          this.serviceElectro.MyElectrolinera(this.uid).subscribe(electro =>{
            //console.log(electro);
            this.uidElectro = electro[0];
            console.log(this.uidElectro)
          })
          
        }
      
      });
    });

  }
 
  
  reEditElectrolinera(){
    this.router.navigate(['panel/editelectrolinera',this.uidElectro]);
  }

  reCrearElectrolinera(){
    this.router.navigate(['panel/electrolinera']);
  }

  rePerfil(){
    this.router.navigate(['panel/perfil']);
  }

  rePerfiles(){
    this.router.navigate(['panel/perfiles']);
  }

  reCrearAdmin(){
    this.router.navigate(['panel/adduser']);
  }
  
  reElectrolineras(){
    this.router.navigate(['panel/list-electrolinera']);
  }

  reNotify(){
    this.router.navigate(['panel/notify']);
  }

  reQuejas(){
    this.router.navigate(['panel/qcs']);
  }

  reNotifyC(){
    this.router.navigate(['panel/notifyc']);
  }

  reElectroC(){
    this.router.navigate(['panel/electro1']);
  }

  salir(){

    this.router.navigate(['login']);
  }

}
