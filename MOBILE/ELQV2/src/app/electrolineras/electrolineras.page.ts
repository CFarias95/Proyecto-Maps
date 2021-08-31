
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectrolinerasService } from '../services/electrolineras.service';

@Component({
  selector: 'app-electrolineras',
  templateUrl: './electrolineras.page.html',
  styleUrls: ['./electrolineras.page.scss'],
})
export class ElectrolinerasPage implements OnInit {

  public items: any = [];
  lugares:any;
  constructor(private servicio: ElectrolinerasService,private router: Router) {
    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];
  }

  ngOnInit() {
    this.getElectrolineras();
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

  getElectrolineras(){
    this.servicio.getElectrolinerasUbicaciones().subscribe((ubicaciones) =>{
      this.items = ubicaciones;
      console.log(this.lugares);
    })
  }

  reRuta(documentId){
    this.router.navigate(['ruta',documentId]);
  }

}
