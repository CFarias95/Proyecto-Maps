import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatosUsuario } from 'src/app/modelm/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  usuario:DatosUsuario;
  mensaje:string;
  id: string;
  public image: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  
  constructor(
    public formBuilder: FormBuilder, 
    private Servicio: AdminService, 
    private alertCtrl: AlertController,
    private serviceAuth : FirebaseauthService, 
    private router:Router, 
    ) { }

  ngOnInit() {
    
    this.ionicForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zñA-ZÑáéíóúÁÉÍÓÚ ]*'), Validators.minLength(3)])],
      apellido: ['',Validators.compose([Validators.required,  Validators.pattern('[a-zñA-ZÑáéíóúÁÉÍÓÚ ]*')])],
      direccion: ['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(30)])],
      mobile: ['',Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(10), Validators.minLength(9)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
      pass: ['', Validators.compose([Validators.required,  Validators.minLength(7),Validators.pattern('[a-zñA-ZÑ0-9!,$%&/()=?¿_@.]*')])],
    })
  }
  //enviar imagen
  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  async presentAlertConfirm(mensajetxt :string) {
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

  
  async registerUser(){

    this.isSubmitted = true;
    if(this.ionicForm.valid)
    {
      let {name,apellido,direccion,email,pass,mobile} = this.ionicForm.value;
      //console.log(emailF,passwordF,nombresF,apellidosF,direccionF,telefonoF);
      if(name.trim() == '' || apellido.trim() == '' || direccion.trim() == '' || mobile.trim() == ''){
        this.mensaje="Los campos no pueden estar vacíos.";
        this.presentAlertConfirm(this.mensaje);
      }else{

        name = name.trim();
        apellido = apellido.trim();
        direccion = direccion.trim();

        const user = this.serviceAuth.register(email,pass,name,apellido,direccion,mobile,'Admin',this.image);
        
        if (user) {

          this.mensaje="Se envió un mensaje de confirmación al correo ingresado.";
          this.presentAlertConfirm(this.mensaje);
          this.router.navigate(['panel/perfiles']);
          
        }else{
          if(this.serviceAuth.errores.code=="auth/email-already-in-use"){
            //console.log(this.authSvc.errores);}
            this.mensaje="El correo ya esta usado por otro usuario.";
            this.presentAlertConfirm(this.mensaje);
            this.router.navigate(['panel/perfiles']);
          }else{
            this.mensaje=this.serviceAuth.errores.message;
            this.presentAlertConfirm(this.mensaje);
          }        
        }      
      }     
    }
    else
    {
      console.log("error");
      this.mensaje="Valida que los campos esten completos y correctos";
      this.presentAlertConfirm(this.mensaje);
      return false;
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
