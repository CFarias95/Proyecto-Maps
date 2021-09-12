import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ElectrolinerasService } from '../services/electrolineras.service';
import { QcsService } from '../services/qcs.service';

@Component({
  selector: 'app-crearqcs',
  templateUrl: './crearqcs.page.html',
  styleUrls: ['./crearqcs.page.scss'],
})
export class CrearqcsPage implements OnInit {

  id: String;
  user: String;
  public items: any = [];
  validations_form: FormGroup;
  validation_messages = {
    'tipo': [
      { type: 'required', message: 'Selecciona el tipo de comentario.' },
    ],
    'origen': [
      { type: 'required', message: 'Para quien va dirigido?.' },
    ],
    'texto': [
      { type: 'required', message: 'Que nos quieres decir?.' },

    ]
  };
  constructor(
    private servicio: ElectrolinerasService,
    private formBuilder: FormBuilder,
    private athservice: AuthenticationService,
    private qcsService: QcsService,
    private router:Router,
    private alertCtrl: AlertController,) {
      this.athservice.userDetails().subscribe(usuario => {
        this.id = usuario.uid;
        this.user = usuario.email;   
      });
     }

  ngOnInit() {
    this.getElectrolineras();
    this.validations_form = this.formBuilder.group({
      tipo: new FormControl('', Validators.compose([
        Validators.required
      ])),
      origen: new FormControl('', Validators.compose([
        Validators.required
      ])),
      texto: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }


  getElectrolineras(){
    this.servicio.getElectrolinerasUbicaciones().subscribe((ubicaciones) =>{
      this.items = ubicaciones;
      
    })
  }

  
  createQCS(value){
    const QCS = this.qcsService.crearQcs(value,this.user,this.id);
    if(QCS){
      this.mensajeerror('Gracias por enviarnos tu opinion');
      this.router.navigate(['listarqcs']);
    }else{
      this.mensajeerror('No se pudo porcesar tu solicitud en este momento intenta mas tarde');
      this.router.navigate(['crearqcs']);
    }

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


}
