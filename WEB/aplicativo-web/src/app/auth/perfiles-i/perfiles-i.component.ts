import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatosUsuario } from 'src/app/modelm/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-perfiles-i',
  templateUrl: './perfiles-i.component.html',
  styleUrls: ['./perfiles-i.component.scss'],
})
export class PerfilesIComponent implements OnInit {

  usuario:any = [];
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
    const user = JSON.parse(localStorage.getItem('user'));
    this.id = user.uid;
    if (this.id){
      this.cargarUsuario();
    } 
  }
  ngOnInit() {}

  //Cargar usuarios
  async cargarUsuario(){
    this.Servicio.getAdministradoresInactivos(this.id).subscribe(administrador => {
      this.usuario = administrador;
      // console.log("DATOS A MOSTRAR: "+this.dataSource);
      // console.log(this.usuario);
    });
  }

  habilitar(id:string){
    this.Servicio.habilitarAdministrador(id).then(() => {
      this.mensaje="Se habilitó el perfil del usuario.";
      this.mensajeerror(this.mensaje);

    });
  }

  async dehabilitar(id:string){
    let alert = this.alertCtrl.create({
      header: 'Deshabilitar',
      message: '¿Seguro que quieres deshabilar el perfil?',
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
              
              this.Servicio.deshabilitarAdministrador(id).then(() => {
                this.mensaje="Se deshabilito el perfil del usuario.";
                this.mensajeerror(this.mensaje);
              });

          }
        }
      ]
    });
    
    (await alert).present();

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
  
  GetTodos(){
    this.router.navigate(['panel/perfiles']);
  }

}
