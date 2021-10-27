import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuarioData: any = {};
  validations_form: FormGroup;
  id:string;
  public image: any;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Un correo es requrrdo.' },
      { type: 'pattern', message: 'Ingresa un correo Valido.' }
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Su contraseña debe tener al menos 5 caracteres.' }
    ],
    'nombre': [
      { type: 'required', message: 'Ingresa tus nombre.' },
      { type: 'maxlength', message: 'No debe exeder der 50 caracteres.' }
    ],
    'apellido': [
      { type: 'required', message: 'Ingresa tus apellidos.' },
      { type: 'maxlength', message: 'No debe exeder der 50 caracteres.' }
    ]
  };

  constructor(
    private usuario:AuthenticationService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authService: AuthenticationService,) { 
      
    this.usuario.userDetails().subscribe(user=>{
      console.log(user.uid);
      this.id = user.uid;
      this.usuario.getUserData(user.uid).subscribe(data=>{
        this.usuarioData = data;
        console.log(this.usuarioData);
      })

    })
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      nombre: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required
      ]))
    });
    
  }

  tryRegister(value) {
    const user = this.usuario.updateUser(this.id, value);
    if(user){
     this.mensajeerror("Datos actualizados con exito");
    }else{   
      this.mensajeerror("Ocurrio un error, intentalo mas tarde");
    }
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.usuario.updateImagen(this.usuarioData,this.id,this.image);
    //this.cargarUsuario();
    
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        //this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
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
}
