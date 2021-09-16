import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Notificaciones } from '../modelm/notificaciones';
import { AuthenticationService } from '../services/authentication.service';
import { NotificacionesService } from '../services/notificaciones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  userName: String;
  public items: any = [];
  filterpost = new Date().toISOString();
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private notificaciones : NotificacionesService
  ) { }

  
  ngOnInit() {
    this.getNoticias();
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.userName = res.displayName;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

  getNoticias(){
    this.notificaciones.getNoticias().subscribe((notificaciones) =>{
      this.items = notificaciones;
      console.log(this.items);
    })

  }
  

}
