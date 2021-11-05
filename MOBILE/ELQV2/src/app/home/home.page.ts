import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { NotificacionesComponent } from '../components/notificaciones/notificaciones.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

   
  constructor(public navCtrl: NavController,private nativeStorage: NativeStorage) {}

  login(){
    this.navCtrl.navigateForward('/login');
   }

   register(){
    this.navCtrl.navigateForward('/register');
   }
}
