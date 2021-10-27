import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailPattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  myFormUser: FormGroup;
  public image: any;
  public mensaje:string;
  constructor(private serviceAuth : FirebaseauthService, private router:Router, private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.myFormUser = new FormGroup({
      emailF: new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      passwordF: new FormControl('',[Validators.required,Validators.minLength(5)]),
      nombresF: new FormControl('',[Validators.required]),
      apellidosF: new FormControl('',[Validators.required]),
      direccionF : new FormControl('',[Validators.required]),
      telefonoF: new FormControl('',[Validators.required,Validators.maxLength(10)])
    });
  }

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: this.mensaje,
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

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['panel']);
    } else {
      this.mensaje="Se envió un mensaje de confirmación al correo ingresado.";
      this.presentAlertConfirm();
      this.router.navigate(['/login']);
     
    }
  }

  async registerUser(){

    if(this.myFormUser.valid)
    {
      let {emailF,passwordF,nombresF,apellidosF,direccionF,telefonoF} = this.myFormUser.value;
      //console.log(emailF,passwordF,nombresF,apellidosF,direccionF,telefonoF);

      this.serviceAuth.register(emailF,passwordF,nombresF,apellidosF,direccionF,telefonoF,'Admin',this.image).then(res=>{
        this.mensaje="Se registro el usuario, verifica tú correo.";
          this.presentAlertConfirm();
      });
      if(this.serviceAuth.errores=="The email address is already in use by another account."){
          //console.log(this.authSvc.errores);}
          this.mensaje="El correo ya esta usado por otro usuario.";
          this.presentAlertConfirm();
      }else{
          this.mensaje="Ocurrio un error, intentalo más tarde.";
          this.presentAlertConfirm();
      }
      this.router.navigate(['/login'])
    }
    else
    {
      console.log("error")
    }
  }

  get emailF() {return this.myFormUser.get('emailF')}
  get passwordF() {return this.myFormUser.get('passwordF')}


}
