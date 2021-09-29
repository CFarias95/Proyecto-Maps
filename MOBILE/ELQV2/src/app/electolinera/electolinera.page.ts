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
        console.log(this.items);
        this.list1 = [{expanded: true}];
        this.list2 = [{expanded: false}];
        this.list3 = [{expanded: false}];
        this.list4 = [{expanded: false}];
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
