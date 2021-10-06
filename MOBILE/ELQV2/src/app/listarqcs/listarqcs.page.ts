import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { count, isEmpty } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { QcsService } from '../services/qcs.service';

@Component({
  selector: 'app-listarqcs',
  templateUrl: './listarqcs.page.html',
  styleUrls: ['./listarqcs.page.scss'],
})
export class ListarqcsPage implements OnInit {

  items:any = [];
  items2:any = [];
  numerodeNotificaciones: number;
  filterpost ='';
  id: String;
  aprobado = "Aprobado";
  rechazado = "Rechazado";
  creado = "Creado";
  
  constructor(private servicio: QcsService, private user: AuthenticationService, public alertController: AlertController) { }

  ngOnInit() {
    this.user.userDetails().subscribe(usuario => {
      this.id = usuario.uid;
      this.quejasRechazadas();
      this.servicio.getMisQCSCreadas(this.id).subscribe(data=> {
        this.items = data;
        console.log(data);
      });
      
    });
  }

  quejasRechazadas(){
    this.servicio.getMisQCSNumTodas(this.id).subscribe((data) => {
      //alert(data.lenght);
      if(!data?.length){  
        console.log("SIN DATOS PARA MOSTRAR");     
      }else{
        console.log("DATOS PARA MOSTRAR");
        console.log(data.isEmpty);
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const texto = data[index].Tipo + " a "+ data[index].Origen;
          this.presentAlert(data[index].Estado,texto);
          this.servicio.updateMisQCS(data[index].id);
        }
      }
    });

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


  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
