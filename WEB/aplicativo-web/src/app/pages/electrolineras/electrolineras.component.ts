import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { from } from 'rxjs';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-electrolineras',
  templateUrl: './electrolineras.component.html',
  styleUrls: ['./electrolineras.component.scss'],
})
export class ElectrolinerasComponent implements OnInit {

   
    // PARA LA PARTE DE AGREGAR Y ACTUALIZAR UNA ELECTROLINERA 
    ionicForm: FormGroup;
    isSubmitted = false;
    mensaje:string;
    id: string;
    public image: any;
    map: GoogleMap;
    @ViewChild('map') element;

   // CREAR UNA VARIABLE DENTRO DEL CONSTRUCTOR
   constructor(
    private serviceStore: FirebasestorageService,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController, 
    public googleMaps: GoogleMaps, 
    public plt: Platform,
    public nav: NavController) {}

   ngOnInit() {
    this.loadMap();
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
        fpago:['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(20),Validators.pattern('[a-zA-Z ]*')])],
        latitud:['',Validators.compose([Validators.required, Validators.minLength(5)])],
        longitud:['',Validators.compose([Validators.required, Validators.minLength(5)])],
        estado:['',Validators.compose([Validators.required])],
        horariotexto:['',Validators.compose([])],
        
     });
   }

   ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDx_q0nhUYOH2dugo66foOjPLUbwRL1U7s',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDx_q0nhUYOH2dugo66foOjPLUbwRL1U7s'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

   
   //subir imagen
   enviarimagen(event: any): void {
    this.image = event.target.files[0];
    console.log(this.image);
  }

  // ELIMINAR ELECTROLINERA
  public eliminarElectrolinera(documentId) {
    this.serviceStore.eliminarElectrolinera(documentId).then(() => {
      alert('Electrolinera eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

  submitForm(){
    this.isSubmitted = true;
    console.log(this.ionicForm.value);
    console.log(this.ionicForm.valid);
    if(!this.ionicForm.valid){

      this.mensaje="Valida que los campos esten completos";
      this.mensajeerror(this.mensaje);
      return false;

    }else{

      let {name,direcion,referencia,tipoconec,cantidadconec,lunes,martes,miercoles,jueves,fpago,latitud,longitud,estado,horariotexto} = this.ionicForm.value;
      this.serviceStore.CrearElectrolinera(name,direcion,referencia,tipoconec,cantidadconec,lunes,martes,miercoles,jueves,fpago,latitud,longitud,estado,horariotexto,this.image).then(() => {
        this.mensaje="Se registro la Electrolinera en el sistema";
        this.mensajeerror(this.mensaje);
      });
      
    }
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

  get errorControl() {
    return this.ionicForm.controls;
  }

}
