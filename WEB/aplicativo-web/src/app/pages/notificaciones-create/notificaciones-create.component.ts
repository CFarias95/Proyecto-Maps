import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Notificaciones } from 'src/app/modelm/notificaciones';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Electrolinera } from '../../modelm/electrolinera';

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
  mydate = new Date().toISOString();
  electrolinera:Electrolinera;
  origen:string;

  constructor(
    public formBuilder: FormBuilder,  
    private alertCtrl: AlertController,
    private service : NotificacionesService, 
    private router:Router,
    private serviceAuth : FirebaseauthService,
    private serviceStore: FirebasestorageService,
  ) { 
    console.log("Fecha de hoy: "+this.mydate);
    const user = JSON.parse(localStorage.getItem('user'));
    this.id = user.uid;

    console.log("USUARIO: "+ this.id);
    this.serviceStore.getElectrolineraId(this.id).subscribe(administrador => {
      this.electrolinera = administrador;
      this.origen = administrador.name;
      //console.log(this.electrolinera);
    });

    if(!this.origen){
      this.origen = 'Administrador';
    }
    
    
  }

  ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zñA-ZÑ0-9%áéíóúÁÉÍÓÚ ]*'), Validators.minLength(3)])],
      titulo: ['',Validators.compose([Validators.required,  Validators.pattern('[a-zñA-ZÑ0-9%áéíóúÁÉÍÓÚ ]*')])],
      texto: ['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(100)])],
      fecha: ['',Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
    })
  }
  
  submitform(){
    this.isSubmitted = true;
    console.log(this.ionicForm.valid);
    console.log(this.ionicForm.value);
    console.log("USUARIO: "+ this.id);
    if(this.ionicForm.valid){
      if(this.ionicForm.value.name.trim() == '' || this.ionicForm.value.titulo.trim() == '' || this.ionicForm.value.texto.trim() == '' ){
        this.mensajeerror('Los campos no pueden estar vacíos');
      }else{
        this.ionicForm.value.name = this.ionicForm.value.name.trim();
        this.ionicForm.value.titulo = this.ionicForm.value.titulo.trim();
        this.ionicForm.value.texto = this.ionicForm.value.texto.trim();
        this.service.addNotify(this.ionicForm.value,this.id,this.origen, this.image);
        this.mensajeerror('La notificación de "'+this.ionicForm.value.tipo+'" fue creada y enviada');
        this.router.navigate(['panel/notify']);
      }
      
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
