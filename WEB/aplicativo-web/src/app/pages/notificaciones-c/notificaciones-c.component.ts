import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones-c',
  templateUrl: './notificaciones-c.component.html',
  styleUrls: ['./notificaciones-c.component.scss'],
})
export class NotificacionesCComponent implements OnInit {

  MyNotificationForm: FormGroup;
  public image: any;
  public mensaje:string;
  boton:string="Registrar";
  public documentId = null;
  public currentStatus = 1;
  public notificaciones:any = [];
  public recurso:string;
  oculto:string= "display:none";
  oculto2:string= "";
  pageActual: number= 1;
  filterpost ='';
  id: string;
  tipo:string;

  constructor(private serviceStore: NotificacionesService, 
    private router: Router,
    private alertCtrl: AlertController,
    private serviceAuth : FirebaseauthService,
    private Servicio: AdminService,  ) {
       
      const user = JSON.parse(localStorage.getItem('user'));

      this.id = user.uid;
      console.log("ID: "+this.id);
      if (this.id){
        this.Servicio.getAdministrador(this.id).subscribe(administrador => {
          this.tipo = administrador.tipo;
          console.log("Tipo: "+this.tipo);
          if(this.tipo.match('Admin')){
              this.serviceStore.getNotify().subscribe((r)=>{
                this.notificaciones= r.map(i =>
                {
                this.notificaciones = i.payload.doc.data() as {}; 
                const id = i.payload.doc.id; 
                return {id, ...this.notificaciones} 
                }      
                )
              })  
          }else{
            this.serviceStore.getNotifyUser(this.id).subscribe((r)=>{
              this.notificaciones= r.map(i =>
              {
              this.notificaciones = i.payload.doc.data() as {}; 
              const id = i.payload.doc.id; 
              return {id, ...this.notificaciones} 
              }      
              )
            })
          }
        });

      }
    }

  ngOnInit() {
    
    this.MyNotificationForm = new FormGroup({
      tituloF: new FormControl('',[Validators.required,Validators.maxLength(20)]),
      textoF: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]),
      fechaF: new FormControl('',[Validators.required]),
      horaF: new FormControl('',[Validators.required, Validators.maxLength(2)]),
      idF : new FormControl('')
    });
  }

  enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  //METODO PARA ACTUALIZAR Y AGREGAR UN NUEVA NOTIFICACION
  // public nuevaNotify(form, documentId = this.documentId) {

  //   if (this.currentStatus == 1) {
  //     let data = {
  //       titulo: form.tituloF,
  //       texto: form.textoF,
  //       fecha: form.fechaF,
  //       hora: form.horaF,
  //     }
      
  //     this.serviceStore.addNotify(data, this.image)
  //     //console.log('Documento creado exitósamente!');
  //     this.MyNotificationForm.setValue({
  //       tituloF: '',
  //       textoF: '',
  //       fechaF: '',
  //       horaF: '',
  //       fotoF: '',
  //       idF: ''
  //     });
      
  //   } else {
      
  //     let data = {
  //       titulo: form.tituloF,
  //       texto: form.textoF,
  //       fecha: form.fechaF,
  //       hora: form.horaF,
  //     }
  //     this.serviceStore.updateNotifi(documentId, data).then(() => {
  //       this.MyNotificationForm.setValue({
  //         tituloF: '',
  //         textoF: '',
  //         fechaF: '',
  //         horaF: '',
  //         urlF: '',
  //         idF: ''
  //       });
  //       this.boton="Registrar"
  //       console.log('Documento editado exitósamente');
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   }

  //   this.oculto = "display:none";
  //   this.oculto2 = "";

  // }

   // CREAR UN METODO PARA OBTENER TODAS LAS NOTIFICACIONES
   public obtenerNotify() {

    console.log("Tipo de usuario actual: "+this.tipo);

     if(this.tipo.match('Admin')){

        this.serviceStore.getNotify().subscribe((r)=>{
          this.notificaciones= r.map(i =>
          {
          this.notificaciones = i.payload.doc.data() as {}; 
          const id = i.payload.doc.id; 
          return {id, ...this.notificaciones} 
          }      
          )
        })  
     }else{
      this.serviceStore.getNotifyUser(this.id).subscribe((r)=>{
        this.notificaciones= r.map(i =>
        {
        this.notificaciones = i.payload.doc.data() as {}; 
        const id = i.payload.doc.id; 
        return {id, ...this.notificaciones} 
        }      
        )
      })
     }
    
  }

  //ELIMINAR notificacion
   public eliminarNotify(documentId) {
    this.serviceStore.removeNotify(documentId).then(() => {
      console.log('Documento eliminado!');
      this.mensajeerror("Se elimino la notificación.");
    }, (error) => {
      console.error(error);
    });
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

  // METODO PARA CARGAR LOS DATOS EN LOS CAMPOS DEL FORMULARIO 
  // POSTERIOR A ELLO REALIZAR EL ACTUALIZAR
  // public actualizarNotify(documentId) {
  //   this.oculto = "";
  //   this.oculto2 = "display:none";
  // let editSubscribe = this.serviceStore.getNotifyId(documentId).subscribe((data) => {
  //   this.currentStatus = 2;
  //   this.documentId = documentId;
  //   this.MyNotificationForm.setValue({
  //     idF: documentId,
  //     tituloF: data.payload.data()['titulo'],
  //     textoF: data.payload.data()['texto'],
  //     fechaF: data.payload.data()['fecha'],
  //     horaF: data.payload.data()['hora'],
  //   });
  //   this.recurso = data.payload.data()['foto'];
  //   this.boton="Actualizar"
  //   editSubscribe.unsubscribe();
  //   });
  // }

  atras(){
    //this.router.navigate(['panel/notify']);
    this.oculto= "display:none";
    this.oculto2= "";
  }
  edit(documentId){
    this.router.navigate(['panel/notifye',documentId]);
  }

  agregar(){

    this.oculto= "";
    this.oculto2= "display:none";
  }


}
