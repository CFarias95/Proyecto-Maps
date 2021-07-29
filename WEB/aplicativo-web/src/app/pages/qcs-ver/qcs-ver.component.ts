import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quejas } from 'src/app/modelm/quejas';
import { QuejasService } from 'src/app/services/quejas.service';

@Component({
  selector: 'app-qcs-ver',
  templateUrl: './qcs-ver.component.html',
  styleUrls: ['./qcs-ver.component.scss'],
})
export class QcsVerComponent implements OnInit {

  ionicForm: FormGroup;
  quejas:Quejas;
  id: string;
  estado='Rechazado';

  
  constructor(
    private route: ActivatedRoute,
    private serviceStore: QuejasService,
    private router: Router,
  ) { 
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      //console.log(this.id);
      this.cargarqcs();
    }
  }

  ngOnInit() {}

  //Cargar queja especifica
  async cargarqcs(){
    this.serviceStore.getQCSId(this.id).subscribe(administrador => {
      this.quejas = administrador;
      //console.log(this.quejas.Tipo);
    });
  }

  atras(){
    this.router.navigate(['panel/qcs']);
  }


}
