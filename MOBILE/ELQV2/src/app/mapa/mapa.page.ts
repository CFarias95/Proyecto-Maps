import { Component, OnInit, ViewChild, ElementRef, NgZone, NgModule } from '@angular/core';

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
import { MapsAPILoader } from '@agm/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';


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
  id:string;
  km: string;
  DistanceService : any;
  icon = {
    url: 'https://firebasestorage.googleapis.com/v0/b/integracion-maps-304321.appspot.com/o/image%20(2).png?alt=media&token=054b2fda-4c08-4885-aa45-ed72e9924eab',
    scaledSize: {
      height: 60, width: 60
  }};
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
    private servicio: ElectrolinerasService,
    private router: Router ,public navCtrl: NavController,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy) {

      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(res=>{
        //alert("Solicitado result : "+ JSON.stringify(res))
      });
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        result => {
          //console.log('Tiene permisos para encontrar location ?',result.hasPermission)
          if(result.hasPermission == false){
            
          }
        }
      );
      
    
      
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log("Coordenates: "+resp.coords.latitude +" - "+ resp.coords.longitude );
        // resp.coords.latitude
        // resp.coords.longitude
       }).catch((error) => {
         console.log('Error getting location', error);
       });
      
      
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
          this.zoom = 20;

        });
      });
    });

    this.checkPermission();

  }

  
  enableGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        //this.currentLocPosition();
      },
      error => alert(JSON.stringify(error))
    );
  }

  checkPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          this.enableGPS();
        } else {
          //this.locationAccPermission();
        }
      },
      error => {
        alert(error);
      }
    );
  }

   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 20;
        this.getAddress(this.latitude, this.longitude);
      });
    }    
  }

  clickedMarker(m: any) {
    this.visible= true;
    this.titulo = m.name;
    this.textos= m.direcion;
    this.id = m.id;
    this.DistanceService = new google.maps.DistanceMatrixService();
    this.DistanceService.getDistanceMatrix(
      {
        origins: [{lat: this.latitude, lng: this.longitude}],
        destinations: [{lat:m.latitud, lng:m.longitud}],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      }, (response, status) => {
        console.log(JSON.stringify(response.rows[0].elements[0]), status);
        const distance = response.rows[0].elements[0].distance.text;
        const tiempo = response.rows[0].elements[0].duration.text;
        console.log(distance);
        this.km = distance + "-"+tiempo;
      })
    
    
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

  reRuta(documentId){
    this.router.navigate(['ruta',documentId]);
  }


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log(results[0]);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  reElectrolineras(){
    this.router.navigate(['electrolineras']);
  }

  menu(){
    this.navCtrl.navigateForward('/dashboard');
   }

}
