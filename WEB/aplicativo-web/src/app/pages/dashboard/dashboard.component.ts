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

}
