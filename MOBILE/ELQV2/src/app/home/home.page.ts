import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   
  constructor(public navCtrl: NavController,private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('Estado').then(res=>{
      if(res == 'Logeado'){
        this.navCtrl.navigateForward('/dashboard');
      }else{
        this.navCtrl.navigateForward('');
      }
      
    }, err => {
      console.log("Error: "+ err);
    });
      
  }

  login(){
    this.navCtrl.navigateForward('/login');
   }

   register(){
    this.navCtrl.navigateForward('/register');
   }
}
