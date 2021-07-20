import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebasestorageService } from 'src/app/services/firebasestorage.service';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  // CERAR UN ARREGLO 
  public autos:any = [];
  // PARA LA PARTE DE AGREGAR Y ACTUALIZAR UN AUTO 
  public documentId = null;
  public currentStatus = 1;
  myFormAuto: FormGroup;

   // CAMBIAR EL NOMBRE DEL BOTON
  boton:string="Registrar"   

  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;

   
   // CREAR UNA VARIABLE DENTRO DEL CONSTRUCTOR
   constructor(
    private serviceStore: FirebasestorageService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {}
  
  
   ngOnInit() {
     // INICIALIZAR EL METODO CREADO
     this.obtenerAutos();
     this.myFormAuto = new FormGroup({
       marcaF: new FormControl(''),
       modeloF: new FormControl(''),
       anioF: new FormControl(''),
       urlF: new FormControl(''),
       idF: new FormControl('')
     });

     //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      //console.log(results);
      //console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  markerDragEnd($event: any) {
    //console.log($event);

    console.log('lat', $event.latLng.lat()); //to see the latitude in the console
    console.log('lng', $event.latLng.lng()); // to see the longitude in the console

    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);

  }
 
   // CREAR UN METODO PARA OBTENER TODOS LOS AUTOS 
   public obtenerAutos() {
     this.serviceStore.ObtenerAutos().subscribe((r)=>{
       this.autos= r.map(i =>
        {
        this.autos = i.payload.doc.data() as {}; 
        const id = i.payload.doc.id; 
        return {id, ...this.autos} 
        }      
       )
     })  
   }
 
   //METODO PARA ACTUALIZAR Y AGREGAR UN NUEVO AUTO 
   public nuevoAuto(form, documentId = this.documentId) {

     if (this.currentStatus == 1) {
       let data = {
         marca: form.marcaF,
         modelo: form.modeloF,
         anio: form.anioF,
         url: form.urlF
       }
       this.serviceStore.crearAuto(data).then(() => {
         console.log('Documento creado exitósamente!');
         this.myFormAuto.setValue({
           marcaF: '',
           modeloF: '',
           anioF: '',
           urlF: '',
           idF: ''
         });
       }, (error) => {
         console.error(error);
       });
     } else {
       
       let data = {
         marca: form.marcaF,
         modelo: form.modeloF,
         anio: form.anioF,
         url: form.urlF
       }
       this.serviceStore.actualizarAuto(documentId, data).then(() => {
         this.myFormAuto.setValue({
           marcaF: '',
           modeloF: '',
           anioF: '',
           urlF: '',
           idF: ''
         });
         this.boton="Registrar"
         console.log('Documento editado exitósamente');
       }, (error) => {
         console.log(error);
       });
     }
   }
   
 
   // METODO PARA CARGAR LOS DATOS EN LOS CAMPOS DEL FORMULARIO 
   // POSTERIOR A ELLO REALIZAR EL ACTUALIZAR
   public actualizarAuto(documentId) {
     let editSubscribe = this.serviceStore.obtenerAutoId(documentId).subscribe((data) => {
       this.currentStatus = 2;
       this.documentId = documentId;
       this.myFormAuto.setValue({
         idF: documentId,
         marcaF: data.payload.data()['marca'],
         modeloF: data.payload.data()['modelo'],
         anioF: data.payload.data()['anio'],
         urlF: data.payload.data()['url']
       });
       this.boton="Actualizar"
       editSubscribe.unsubscribe();
     });
   }
 
   //ELIMINAR AUTO
   public eliminarAuto(documentId) {
     this.serviceStore.eliminarAuto(documentId).then(() => {
       console.log('Documento eliminado!');
     }, (error) => {
       console.error(error);
     });
   }


}
