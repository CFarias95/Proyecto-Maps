import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { DatosUsuario } from 'src/app/modelm/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  ionicForm: FormGroup;
  ionicForm2: FormGroup;
  isSubmitted = false;
  usuario:DatosUsuario;
  mensaje:string;
  id: string;
  public image: any;
  
  

  constructor(
    public formBuilder: FormBuilder, 
    private Servicio: AdminService, 
    private alertCtrl: AlertController,
    private serviceAuth : FirebaseauthService,) {
      
    this.serviceAuth.getCurrentUser().then(r=>{
      this.id = r.uid;
      if (this.id){
        this.cargarUsuario();
      } 
    });   
   }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)])],
      apellido: ['',Validators.compose([Validators.required,  Validators.pattern('[a-zA-Z ]*')])],
      direccion: ['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(30)])],
      mobile: ['',Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(10), Validators.minLength(9)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
    })
    this.ionicForm2 = this.formBuilder.group({
      pss:['',Validators.compose([Validators.minLength(5),Validators.required])],
      pss2:['',Validators.compose([Validators.minLength(5),Validators.required])],
    })
  }

  submitForm() {

    this.isSubmitted = true;
    console.log(this.ionicForm.value);
    console.log(this.ionicForm.valid);
    
    if(!this.ionicForm.valid) { 
      this.mensaje="Valida que los campos esten completos";
      this.mensajeerror(this.mensaje);
      return false;
    } else {
      this.Servicio.updateAdministrador(this.usuario, this.id).then(() => {
        this.mensaje="Se actualizó tu perfil.";
        this.mensajeerror(this.mensaje);
      });
    }
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
       onlyself: true
    })
  }
//metodo para cambiar la contraseña
  async cambiarcontra(){
    this.Servicio.resetPassword(this.usuario.correo).then(() => {
      this.mensaje="Se envió un correo para cambiar la contraseña. ";
      this.mensajeerror(this.mensaje);
    });
  }

//Cargar usuario
  async cargarUsuario(){
    this.Servicio.getAdministrador(this.id).subscribe(administrador => {
      this.usuario = administrador;
      console.log(this.usuario);
    });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.Servicio.updateImagen(this.usuario,this.id,this.image);
    this.cargarUsuario();
    
  }

  //recuperar los controles validadores
  get errorControl() {
    return this.ionicForm.controls;
  }

  get errorControl2() {
    return this.ionicForm2.controls;
  }
  
  CambiarContra(){

    this.isSubmitted = true;
    const valor  = this.ionicForm2.value;
    console.log(valor.pss);
    if(valor.pss == valor.pss2){
      this.serviceAuth.cambiarContraseña(valor.pss).then(()=>{
        this.mensaje="Se cambio de contraseña";
        this.mensajeerror(this.mensaje);
  
      });
    }else{
      this.mensaje="La contraseña no coincide";
      this.mensajeerror(this.mensaje);
    }
   

  }


  //mostramos mensajes
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



}
