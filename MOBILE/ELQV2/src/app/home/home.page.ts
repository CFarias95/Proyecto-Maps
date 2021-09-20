import { Component } from '@angular/core';
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
  
  constructor(public navCtrl: NavController) {}

  login(){
    this.navCtrl.navigateForward('/login');
   }

   register(){
    this.navCtrl.navigateForward('/register');
   }
}
