import { Component } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';

//import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  
  constructor( 
    //private notificationsService : NotificationsService,
    private platform: Platform,
    public loadingController: LoadingController) {
    
    //this.notificationsService.inicializar();
    
    this.platform.ready().then(async () => {
      const loading =  this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando...',
        duration: 2000
      });
      (await loading).present();
  
      (await loading).onDidDismiss();
      
      console.log('Loading dismissed!');
    });

    
  }

}
