import { Component, OnInit } from '@angular/core';
import { Notificaciones } from '../modelm/notificaciones';
import { NotificacionesService } from '../services/notificaciones.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: Notificaciones;
  public items: any = [];
  filterpost = new Date().toISOString();
  
  constructor(private notificaciones : NotificacionesService) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias(){
    this.notificaciones.getNoticias().subscribe((notificaciones) =>{
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
