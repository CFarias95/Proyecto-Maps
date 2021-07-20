import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuejasService } from 'src/app/services/quejas.service';

@Component({
  selector: 'app-qcs-list',
  templateUrl: './qcs-list.component.html',
  styleUrls: ['./qcs-list.component.scss'],
})
export class QcsListComponent implements OnInit {

  pageActual: number= 1;
  public quejas:any = [];
  filterpost ='';

  constructor(
    private serviceStore: QuejasService,
    private router: Router, ) { }

  ngOnInit() {
    this.obtenerQuejas();
  }

   // CREAR UN METODO PARA OBTENER TODAS LAS quejas
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

  aprobar(documentId){
    this.serviceStore.aprobarQCS(documentId).then(() => {
      console.log('Queja Aprobada!');
    }, (error) => {
      console.error(error);
    });
  }

  rechazar(documentId){
    this.serviceStore.RechazarQCS(documentId).then(() => {
      console.log('Queja Rechazada!');
    }, (error) => {
      console.error(error);
    });
  }

  GetAprobadas(){
    this.router.navigate(['panel/qcsa']);
  }
  
  GetRechazadas(){
    this.router.navigate(['panel/qcsr']);
  }

  ver(documentId){
    this.router.navigate(['panel/qcsver',documentId]);
  }
  
}
