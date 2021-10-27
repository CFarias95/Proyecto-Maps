import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectrolinerasService } from '../services/electrolineras.service';

@Component({
  selector: 'app-electolinera',
  templateUrl: './electolinera.page.html',
  styleUrls: ['./electolinera.page.scss'],
})
export class ElectolineraPage implements OnInit {

  public items: any = [];
  public list1: any = [];
  public list2: any = [];
  public list3: any = [];
  public list4: any = [];

  id = "";

  lunes1= "";
  lunes2 = "";

  martes1= "";
  martes2 = "";

  miercoles1= "";
  miercoles2 = "";

  jueves1= "";
  jueves2 = "";

  constructor(
    private servicio: ElectrolinerasService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      console.log(this.id);
      this.servicio.getElectrolineraId(this.id).subscribe((ubicaciones) =>{
        this.items = ubicaciones;
        console.log("horario lunes: "+ubicaciones.lunes.upper+ " "+ubicaciones.lunes.lower);
        console.log(this.items.name);
        this.list1 = [{expanded: true}];
        this.list2 = [{expanded: true}];
        this.list3 = [{expanded: true}];
        this.list4 = [{expanded: true}];

        if (ubicaciones.lunes.lower < 12){
          this.lunes1 = ubicaciones.lunes.lower + " AM"
        }else{
          this.lunes1 = ubicaciones.lunes.lower + " PM"
        }

        if (ubicaciones.lunes.upper >= 12){
          this.lunes2 = ubicaciones.lunes.upper + " PM"
        }else{
          this.lunes2 = ubicaciones.lunes.upper + " AM"
        }

        if (ubicaciones.martes.lower < 12){
          this.martes1 = ubicaciones.martes.lower + " AM"
        }else{
          this.martes1 = ubicaciones.martes.lower + " PM"
        }

        if (ubicaciones.martes.upper >= 12){
          this.martes2 = ubicaciones.martes.upper + " PM"
        }else{
          this.martes2 = ubicaciones.martes.upper + " AM"
        }

        if (ubicaciones.miercoles.lower < 12){
          this.miercoles1 = ubicaciones.miercoles.lower + " AM"
        }else{
          this.miercoles1 = ubicaciones.miercoles.lower + " PM"
        }

        if (ubicaciones.miercoles.upper >= 12){
          this.miercoles2 = ubicaciones.miercoles.upper + " PM"
        }else{
          this.miercoles2 = ubicaciones.miercoles.upper + " AM"
        }

        if (ubicaciones.jueves.lower < 12){
          this.jueves1 = ubicaciones.jueves.lower + " AM"
        }else{
          this.jueves1 = ubicaciones.jueves.lower + " PM"
        }

        if (ubicaciones.miercoles.upper > 12){
          this.jueves2 = ubicaciones.jueves.upper + " PM"
        }else{
          this.jueves2 = ubicaciones.jueves.upper + " AM"
        }


      })

    }
  }

  reRuta(){
    this.router.navigate(['ruta',this.id]);
  }


  reVer(){
    this.router.navigate(['electolinera',this.id]);
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      item.expanded = true;
    }
  }

}
