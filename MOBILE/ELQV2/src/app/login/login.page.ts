import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, NavController, Platform } from '@ionic/angular';
//import * as firebase from 'firebase';
import { AuthenticationService } from '../services/authentication.service';
import  firebase  from 'firebase/app';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

  public isGoogleLogin = false;
  public user = null;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  
  constructor(  private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private google: GooglePlus,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private router: Router,
    private nativeStorage: NativeStorage
   
) { 
  this.nativeStorage.getItem('Estado').then(res=>{
    if(res == 'Logeado'){
      this.navCtrl.navigateForward('/dashboard');
    }else{
      //this.navCtrl.navigateForward('');
    }
    
  }, err => {
    console.log("Error: "+ err);
  });
}

async ngOnInit() {


    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Ingrese un Correo.' },
      { type: 'pattern', message: 'Ingrese un Correo Valido.' }
    ],
    'password': [
      { type: 'required', message: 'Ingrese su contraseña.' },
      { type: 'minlength', message: 'La contraseña al menos 5 caracteres.' }
    ]
  };

  
  loginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('dashboard');
        
      }, err => {
        this.errorMessage = "Valida el Correo y la contraseña ingresada";
      });

  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  googleL(){

    const user = this.authService.googleLogin().then(res=>{
      //alert (JSON.stringify(res));
      this.router.navigate(['dashboard']);
    },err=>{
      console.log(JSON.stringify(err))
    });
    //alert (JSON.stringify(user));
  }

  onLoginError(err) {
    console.log(err);
  }

}

