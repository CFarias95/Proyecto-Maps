import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { AlertController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myFormUser: FormGroup;
  user: any
  constructor(
    private serviceAuth : FirebaseauthService,
    private router:Router,
    public alertController: AlertController,
    private Servicio: AdminService,) { }

  ngOnInit(): void {
    this.myFormUser = new FormGroup({
      usuarioF: new FormControl(''),
      passwordF: new FormControl('')
    });
  }

  async loginUser(){

    let {usuarioF,passwordF} = this.myFormUser.value;
    this.user = await this.serviceAuth.login(usuarioF,passwordF)
    if(this.user){
      console.log(this.user.displayName);
      console.log(this.user.photoURL);
      
      this.router.navigate(['panel'])
    }else{
      this.presentAlert();
    } 
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Verifica tu usuario y/o Contraseña',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  //metodo para cambiar la contraseña
  async cambiarcontra(){

    let {usuarioF} = this.myFormUser.value;
    if(usuarioF == ''){
      this.mensajeerror("Ingresa el correo en el campo para restablecer contraseña");
    }else{
      this.Servicio.resetPassword(usuarioF).then(() => {
        this.mensajeerror("Se envió un correo para cambiar la contraseña. ");
        });
    }
    
  }
  //mostramos mensajes
  async mensajeerror(mensajetxt: string) {
    const alert = await this.alertController.create({
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

}
