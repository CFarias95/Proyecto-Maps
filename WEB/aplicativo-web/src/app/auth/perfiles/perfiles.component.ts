import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatosUsuario } from 'src/app/modelm/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss'],
})

export class PerfilesComponent implements OnInit {

  usuario:any;
  mensaje:string;
  id: string;
  pageActual: number= 1;
  filterpost = '';
  activo = "Activo";
  nombre = "";

  constructor(
    private Servicio: AdminService, 
    private alertCtrl: AlertController,
    private serviceAuth : FirebaseauthService,
    private router: Router,
    ) { 
      this.serviceAuth.getCurrentUser().then(r=>{
        this.id = r.uid;
        if (this.id){
          this.cargarUsuario();
        } 
      }); 
    }

  ngOnInit() {}

  //Cargar usuarios
  async cargarUsuario(){
    this.Servicio.getAdministradores().subscribe(administrador => {
      this.usuario = administrador;
      // console.log("DATOS A MOSTRAR: "+this.dataSource);
      // console.log(this.usuario);
    });
  }

  habilitar(id:string){
    this.Servicio.habilitarAdministrador(id).then(() => {
      this.mensaje="Se habilito el perfil del usuario.";
      this.mensajeerror(this.mensaje);

    });
  }

  dehabilitar(id:string){
    this.Servicio.deshabilitarAdministrador(id).then(() => {
      this.mensaje="Se Deshabilito el perfil del usuario.";
      this.mensajeerror(this.mensaje);

    });
  }

  
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

  GetActivos(){
    this.router.navigate(['panel/perfilesa']);
  }
  GetInactivas(){
    this.router.navigate(['panel/perfilesi']);
  }


}
