import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
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

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    const reader = new FileReader;
    reader.onload = (event: any ) => {
      this.image2 = event.target.result;

    }
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.image);
  }

  tryRegister(value) {
    const user = this.authService.registerUser(value,this.image);
    if(user){
      this.errorMessage = "";
      this.successMessage = "tu Cuenta a sido creada.";
    }else{
      this.errorMessage = "No se pudo crear tu cuenta verifica tu correo";
      this.successMessage = "";
    }
     
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }



}
