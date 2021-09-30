import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { QcsService } from '../services/qcs.service';

@Component({
  selector: 'app-listar-su',
  templateUrl: './listar-su.page.html',
  styleUrls: ['./listar-su.page.scss'],
})
export class ListarSuPage implements OnInit {

  items:any = [];
  filterpost ='';
  id: String;
  aprobado = "Aprobado";
  rechazado = "Rechazado";
  creado = "Creado";
  

  constructor(private servicio: QcsService, private user: AuthenticationService) { }

  ngOnInit() {
    this.user.userDetails().subscribe(usuario => {
      this.id = usuario.uid;
      this.servicio.getMisQCSRechazadas(this.id).subscribe(data=> {
        this.items = data;
        console.log(data);
      });
      
    });
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
