import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myFormUser: FormGroup;
  constructor(private serviceAuth : FirebaseauthService,
    private router:Router,public alertController: AlertController) { }

  ngOnInit(): void {
    this.myFormUser = new FormGroup({
      usuarioF: new FormControl(''),
      passwordF: new FormControl('')
    });
  }

  async loginUser(){

    let {usuarioF,passwordF} = this.myFormUser.value;
    const user = await this.serviceAuth.login(usuarioF,passwordF)
    if(user){
      console.log(user.displayName);
      console.log(user.photoURL);
      
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

}
