import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Notificaciones } from 'src/app/modelm/notificaciones';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones-create',
  templateUrl: './notificaciones-create.component.html',
  styleUrls: ['./notificaciones-create.component.scss'],
})
export class NotificacionesCreateComponent implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  notify:Notificaciones;
  mensaje:string;
  id: string;
  image: any;
  mydate: any = new Date().toISOString();
  day: any = new Date().getUTCDay();
  mes: any = new Date().getUTCMonth();
  year: any = new Date().getUTCFullYear();

  constructor(
    public formBuilder: FormBuilder,  
    private alertCtrl: AlertController,
    private service : NotificacionesService, 
    private router:Router,
  ) { 
    console.log(this.day,this.mes, this.year, this.mydate);
   
  }

  ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)])],
      titulo: ['',Validators.compose([Validators.required,  Validators.pattern('[a-zA-Z ]*')])],
      texto: ['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      fecha: ['',Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      hora: ['', Validators.compose([Validators.required])],
    })
  }
  
  submitform(){
    this.isSubmitted = true;
    console.log(this.ionicForm.valid);
    console.log(this.ionicForm.value);
    if(this.ionicForm.valid){
      this.service.addNotify(this.ionicForm.value, this.image);
      this.mensajeerror('La notificacion fue creada');
      this.router.navigate(['panel/notify']);
    }else{
      this.mensajeerror('Valida que los campos esten completos y correctos');
    }
  }

  //enviar imagen
  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }

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

  get errorControl() {
    return this.ionicForm.controls;
  }
}
