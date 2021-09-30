import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { QcsService } from '../services/qcs.service';

@Component({
  selector: 'app-listar-cm',
  templateUrl: './listar-cm.page.html',
  styleUrls: ['./listar-cm.page.scss'],
})
export class ListarCmPage implements OnInit {

  items:any = [];
  filterpost ='';
  id: String;
  aprobado = "Aprobado";
  rechazado = "Rechazado";
  creado = "Creado";


  constructor( private servicio: QcsService, private user: AuthenticationService) { }


  ngOnInit() {
    this.user.userDetails().subscribe(usuario => {
      this.id = usuario.uid;
      this.servicio.getMisQCSAprobadas(this.id).subscribe(data=> {
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
