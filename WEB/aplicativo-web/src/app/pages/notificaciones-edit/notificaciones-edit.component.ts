import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Notificaciones } from 'src/app/modelm/notificaciones';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones-edit',
  templateUrl: './notificaciones-edit.component.html',
  styleUrls: ['./notificaciones-edit.component.scss'],
})
export class NotificacionesEditComponent implements OnInit {

  ionicForm: FormGroup;
  isSubmitted = false;
  notifificaciones:Notificaciones;
  mensaje:string;
  id: string;
  public image: any;

  constructor(
    private route: ActivatedRoute,
    private service : NotificacionesService,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder, 
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      console.log(this.id);
      this.cargarNotify();
    }
   }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)])],
      titulo: ['',Validators.compose([Validators.required,  Validators.pattern('[a-zA-Z ]*')])],
      texto: ['',Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      fecha: ['',Validators.compose([Validators.required])],
      hora: ['', Validators.compose([Validators.required])],
    })
  }
  atras(){
    this.router.navigate(['panel/notify']);
  }

  async cargarNotify(){
    this.service.getNotifyId(this.id).subscribe(administrador => {
      this.notifificaciones =administrador;
      console.log(administrador);
    });
  }

  submitform(){

    this.isSubmitted = true;
    if(this.ionicForm.valid){
      this.service.updateNotifi(this.id,this.ionicForm.value);
      this.mensajeerror('Se actualizo la notificacion');
      this.router.navigate(['panel/notify']);
    }else{
      this.mensajeerror('Verifica los campos');
    }

  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];
    this.service.updateImagen(this.ionicForm.value,this.id,this.image);
    this.mensajeerror('Se actualizo la notificacion');
    this.router.navigate(['panel/notify']);
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
