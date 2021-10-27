import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import { Electrolinera } from '../../modelm/electrolinera';
import { MapsAPILoader, AgmMap } from '@agm/core';


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

  title: string = 'ELQ Project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  chesk = '00:00-00:00';

  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  
  constructor(
    private route: ActivatedRoute,
    private serviceStore: FirebasestorageService,
    public formBuilder: FormBuilder,  
    private alertCtrl: AlertController,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { 
    
    this.id = this.route.snapshot.params['id'];
    if (this.id){
      console.log(this.id);
      this.cargarElectrolinera();

    }
  }

  ngOnInit() {
    
    this.ionicForm = this.formBuilder.group({
      name: ['',Validators.compose([Validators.required, Validators.pattern('[a-zñA-ZÑ0-9áéíóúÁÉÍÓÚ ]*'), Validators.minLength(5)])],
      direcion: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(200)])],
      referencia: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(50)])],
      tipoconector: ['',Validators.compose([Validators.required, Validators.minLength(5), , Validators.maxLength(20)])],
      numeroconectores: ['',Validators.compose([Validators.required, Validators.minLength(1), , Validators.maxLength(3),Validators.pattern('^[0-9]+$')])],
      lunes:['',Validators.compose([Validators.required])],
      martes:['',Validators.compose([Validators.required])],
      miercoles:['',Validators.compose([Validators.required])],
      jueves:['',Validators.compose([Validators.required])],
      formaspago:['',Validators.compose([Validators.required,Validators.pattern('[a-zñA-ZÑáéíóúÁÉÍÓÚ ]*')])],
      latitud:['',Validators.compose([Validators.required, Validators.minLength(5)])],
      longitud:['',Validators.compose([Validators.required, Validators.minLength(5)])],
      estado:['',Validators.compose([Validators.required])],
      horariotexto:['',Validators.compose([])],
      sector:['',Validators.compose([Validators.required])],
      
      
    });

    //Cargar lugares 
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
   
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        if(this.electrolinera.latitud > 0 || this.electrolinera.latitud < 0){

          console.log("Si existen datos");
          this.latitude = this.electrolinera.latitud;
          this.longitude = this.electrolinera.longitud;
          
        }else{
          console.log("NO existen datos");
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        }
        
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    //console.log($event);

    console.log('lat', $event.latLng.lat()); //console
    console.log('lng', $event.latLng.lng()); //console

    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();

    this.electrolinera.latitud =  this.latitude;
    this.electrolinera.longitud = this.longitude;

    this.getAddress(this.latitude, this.longitude);

  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      //console.log(results);
      //console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          this.electrolinera.direccion = this.address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  //Cargar Electrolinera
  async cargarElectrolinera(){

    this.serviceStore.getElectrolineraId(this.id).subscribe(administrador => {
      this.electrolinera = administrador;
      console.log(this.electrolinera);
      this.setCurrentLocation();
    });

    if(this.electrolinera.lunes == ''){
      this.electrolinera.lunes='00:00-00:00';
    }else if(this.electrolinera.martes == ''){
      this.electrolinera.martes='00:00-00:00';
    }else if(this.electrolinera.miercoles == ''){
      this.electrolinera.miercoles='00:00-00:00';
    }else if(this.electrolinera.jueves == ''){
      this.electrolinera.jueves='00:00-00:00';
    }
  }

  async subirImagen(event: any): Promise<void> {
    this.image = event.target.files[0];

    this.serviceStore.updateImagen(this.ionicForm.value,this.id,this.image);
    this.mensajeerror('Se actualizó la electrolinera');
    this.cargarElectrolinera();
    
  }

  submitForm() {

    this.isSubmitted = true;
    console.log(this.ionicForm.value);
    console.log(this.ionicForm.valid);
    console.log(this.ionicForm.value.lunes);
    if(this.ionicForm.value.horariotexto){
      console.log(this.ionicForm.value.horariotexto);
    }else{
      console.log("Campo hora texto vacío");
    }


    //this.ionicForm.value.horariotexto.set("");
    if(!this.ionicForm.valid) { 
      this.mensaje="Valida que los campos esten completos y correctos";
      this.mensajeerror(this.mensaje);
      return false;
    } else {
      if(this.ionicForm.value.name.trim() == '' ||  this.ionicForm.value.name.trim() == '' ||  this.ionicForm.value.referencia.trim() == '' ||  this.ionicForm.value.tipoconector.trim() == '' ||  this.ionicForm.value.formaspago.trim() == ''){
        this.mensaje="Los campos no pueden estar vacíos";
        this.mensajeerror(this.mensaje);
      }else{
        this.serviceStore.actualizarElectrolinera(this.ionicForm.value, this.id).then(() => {
          this.mensaje="Se actualizó la electrolinera.";
          this.mensajeerror(this.mensaje);
        });
      }
      
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
  
  get errorControl() {
    return this.ionicForm.controls;
  }

}
