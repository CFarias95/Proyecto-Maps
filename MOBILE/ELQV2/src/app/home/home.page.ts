import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    loop: true,
    effect: 'coverflow',
  };
  
  constructor(public navCtrl: NavController,private nativeStorage: NativeStorage) {
    this.nativeStorage.getItem('Estado').then(res=>{
      this.navCtrl.navigateForward('/dashboard');
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
