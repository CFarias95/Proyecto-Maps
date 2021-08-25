import { Component, OnInit, ViewChild, ElementRef, NgZone, NgModule } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { ElectrolineraUbicacion } from '../modelm/electrolinera';
import {   GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { ElectrolinerasService } from '../services/electrolineras.service';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  
})

export class MapaPage implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  private marker;
  lugares:any;
  visible = false;
  titulo:string;
  textos: string;

  mapOptions = {
    styles: [
      {
        url: "./assets/images/cluster.png",
        width: 70,
        height: 50,
        textColor: "rED",
        fontWeight: "bold",
        textSize: "14px",
        fontFamily: "nunito",
        lineHeight: "12px",
        paddingTop: "8px",
        backgroundSize: "cover"
      }
    ],
    calculator: markers => {
      for (let i = 0; i < markers.length; i++) {
        // you have access all the markers from each cluster
      }
      return {
        text: markers.length + " MARKERS",
        index: 1
      };
      // index: 1 -> for green icon
      // index: 2 -> for red icon
    }
  };

  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private servicio: ElectrolinerasService
  ) {
    
  }

  ngOnInit() {

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.renderMarker();
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

  clickedMarker(m: any) {
    this.visible= true;
    this.titulo = m.name;
    this.textos= m.direcion;
    
  }

  mapClicked($event: MouseEvent) {
    this.visible=false;
  }

  renderMarker(){
    this.servicio.getElectrolinerasUbicaciones().subscribe((ubicaciones) =>{
      this.lugares = ubicaciones;
      console.log(this.lugares);
    })
  }

  // markerDragEnd($event: any) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
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

}
