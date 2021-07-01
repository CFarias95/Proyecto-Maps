import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import { Electrolinera } from '../../modelm/electrolinera';

@Component({
  selector: 'app-edit-electrolinera',
  templateUrl: './edit-electrolinera.component.html',
  styleUrls: ['./edit-electrolinera.component.scss'],
})
export class EditElectrolineraComponent implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  electrolinera:Electrolinera;
  mensaje:string;
  id: string;
  public image: any;
  map = null;
  

  constructor(
    private route: ActivatedRoute,
    private serviceStore: FirebasestorageService,
    public formBuilder: FormBuilder,  
    private alertCtrl: AlertController,
    private router: Router
  ) { 
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      console.log(this.id);
      this.cargarElectrolinera();
    }
  }

  ngOnInit() {
    
    this.ionicForm = this.formBuilder.group({
      name: ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(5)])],
      direcion: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(20)])],
      referencia: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(50)])],
      tipoconec: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(20)])],
      cantidadconec: ['',Validators.compose([Validators.required, Validators.minLength(1), , Validators.maxLength(3),Validators.pattern('^[0-9]+$')])],
      lunes:['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}')])],
      martes:['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}')])],
      miercoles:['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}')])],
      jueves:['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}')])],
      viernes:['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}')])],
      sabado:['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}')])],
      domingo:['',Validators.compose([Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}')])],
      fpago:['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(20),Validators.pattern('[a-zA-Z ]*')])],
      latitud:['',Validators.compose([Validators.required, Validators.minLength(5)])],
      longitud:['',Validators.compose([Validators.required, Validators.minLength(5)])],
      estado:['',Validators.compose([Validators.required])],
      
   });
   
  }

  //Cargar Electrolinera
  async cargarElectrolinera(){
    this.serviceStore.getElectrolineraId(this.id).subscribe(administrador => {
      this.electrolinera = administrador;
      console.log(this.electrolinera);
    });
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.serviceStore.updateImagen(this.ionicForm.value,this.id,this.image);
    this.mensajeerror('Se actualizo la electrolinera');
    this.cargarElectrolinera();
    
  }

  submitForm() {

    this.isSubmitted = true;
    console.log(this.ionicForm.value);
    console.log(this.ionicForm.valid);
    
    if(!this.ionicForm.valid) { 
      this.mensaje="Valida que los campos esten completos y correctos";
      this.mensajeerror(this.mensaje);
      return false;
    } else {
      this.serviceStore.actualizarElectrolinera(this.ionicForm.value, this.id).then(() => {
        this.mensaje="Se actualizó la Electrolinera.";
        this.mensajeerror(this.mensaje);
      });
    }
  }

  cancelar(){
    this.router.navigate(['panel/list-electrolinera']);
  }
   //mostramos mensajes
   async mensajeerror(mensajetxt: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: mensajetxt,
      buttons: [
       {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  

}
