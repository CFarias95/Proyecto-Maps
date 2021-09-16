import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../services/notificaciones.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.page.html',
  styleUrls: ['./promos.page.scss'],
})
export class PromosPage implements OnInit {


  public items: any = [];

  filterpost = new Date().toISOString();


  constructor(private notificaciones : NotificacionesService) { }

  ngOnInit() {
    this.getPromos();
    console.log(this.filterpost);
  }

  getPromos(){
    this.notificaciones.getPromociones().subscribe((notificaciones) =>{
      this.items = notificaciones;
      console.log(this.items);
    })
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
