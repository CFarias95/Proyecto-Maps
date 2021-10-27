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
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

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
    this.serviceAuth.login(usuarioF,passwordF).then(res=>{
      console.log(res);
       if(res){
        console.log(res.displayName);
        console.log(res.photoURL);
        //this.router.navigate(['panel'])
        window.location.replace('panel');
      }else{
        this.presentAlert();
      } 
    });
    // console.log(this.user);
   
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: '--background: #fff',
      header: 'Error',
      message: 'Verifica tu usuario y/o contraseña',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  home(){
    this.router.navigate(['home'])
  }

  //metodo para cambiar la contraseña
  async cambiarcontra(){

    // let {usuarioF} = this.myFormUser.value;
    // if(usuarioF == ''){
    //   this.mensajeerror("Ingresa el correo en el campo para restablecer contraseña");
    // }else{
    //   this.Servicio.resetPassword(usuarioF).then(() => {
    //     this.mensajeerror("Se envió un correo para cambiar la contraseña. ");
    //     });
    // }
    let alert = this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Recuperar Contraseña',
      inputs: [
        {
          name: 'email',
          placeholder: 'Ingresa tú correo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('You Clicked on Cancel');
          }
        },
        {
          text: 'Restablecer',
          handler: data => {
            if (data.email != '') {
              console.log(data.email);
              this.Servicio.resetPassword(data.email).then(() => {
                console.log('Revisa tú correo!');
               this. mensajeerror('Revisa tú correo!');
              }, (error) => {
                console.error(error);
                this. mensajeerror('Ocurrió un error, intentalo más tarde');
              });

            } else {
              // invalid login
              this. mensajeerror('Debe ingresar un correo');
              return false;
            }
          }
        }
      ]
    });
    
    (await alert).present();

  }
 // mostrar ocultar texto contraseñas
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
    
  //mostramos mensajes
  async mensajeerror(mensajetxt: string) {
    const alert = await this.alertController.create({
      cssClass: 'background: #fff',
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
