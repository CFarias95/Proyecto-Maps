import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  public image: any;
  public image2: any;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

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
      { type: 'maxlength', message: 'No debe exeder der 50 caracteres.' },
      { type: 'pattern', message: 'Solo se permiten letras.'}
    ],
    'apellido': [
      { type: 'required', message: 'Ingresa tus apellidos.' },
      { type: 'maxlength', message: 'No debe exeder der 50 caracteres.' },
      { type: 'pattern', message: 'Solo se permiten letras.'}
    ]
  };


  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public alertController: AlertController
  
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),
      nombre: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.maxLength(50),
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]))
    });
  }

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    const reader = new FileReader;
    reader.onload = (event: any ) => {
      this.image2 = event.target.result;

    }
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.image);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  tryRegister(value) {
    const user = this.authService.registerUser(value,this.image);
    if(user){
      this.errorMessage = "";
      this.successMessage = "tu Cuenta a sido creada.";
      this.presentAlert("Mensaje","Tù cuenta ha sido creada, verifica tù correo");
      this.navCtrl.navigateBack('');
    }else{
      this.errorMessage = "No se pudo crear tu cuenta verifica tu correo.";
      this.presentAlert("Error","Ocurrio un erro, intenta màs tarde.");
      this.successMessage = "";
    }
     
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }

  async presentAlert(titulo: string, texto: string ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: texto,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
