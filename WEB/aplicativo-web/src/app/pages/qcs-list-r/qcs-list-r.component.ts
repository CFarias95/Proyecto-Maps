import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuejasService } from 'src/app/services/quejas.service';

@Component({
  selector: 'app-qcs-list-r',
  templateUrl: './qcs-list-r.component.html',
  styleUrls: ['./qcs-list-r.component.scss'],
})
export class QcsListRComponent implements OnInit {

  public quejas:any = [];
  estado = "Rechazado";
  pageActual: number= 1;
  filterpost = '';
  constructor(
    private serviceStore: QuejasService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.obtenerQuejas();
  }

  public obtenerQuejas() {
    this.serviceStore.getQCS().subscribe((r)=>{
      this.quejas= r.map(i =>
       {
       this.quejas = i.payload.doc.data() as {}; 
       const id = i.payload.doc.id; 
       return {id, ...this.quejas} 
       }      
      )
    })  
  }


  GetTodas(){
    this.router.navigate(['panel/qcs']);
  }

  
  GetAprobadas(){
    this.router.navigate(['panel/qcsa']);
  }

  ver(documentId){
    this.router.navigate(['panel/qcsver',documentId]);
  }
  

}
