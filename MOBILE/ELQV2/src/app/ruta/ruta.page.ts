import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectrolinerasService } from '../services/electrolineras.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {

  latitudeD:  number;
  longitudeD: number;

  latitude: number;
  longitude: number;

  zoom: number;

  electrolinera:any; 

  public origin: any;
  public destination: any;
  private geoCoder;

  id: string;

  constructor(private route: ActivatedRoute,private servicio: ElectrolinerasService,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation()
      this.geoCoder = new google.maps.Geocoder;
      this.id = this.route.snapshot.params['id'];
      if (this.id){
        //this.getElectrolinera();
        this.setCurrentLocation(); 
      }
    });
    
    

    // console.log(this.id);
    // console.log(this.latitude +", "+ this.longitude);

    //this.setCurrentLocation(); 
    //this.getDirection();
  }

  getDirection() {
    // console.log(this.latitude +", "+ this.longitude);
    // console.log(this.latitudeD +", "+ this.longitudeD);
    this.origin = { lat: this.latitude, lng: this.longitude };
    this.destination = { lat: this.latitude, lng: this.longitude };
  }

  setCurrentLocation() {
    //if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.servicio.getElectrolineraId(this.id).subscribe((ubicaciones) =>{
          this.electrolinera = ubicaciones;
          //console.log(this.electrolinera);
          this.latitudeD = this.electrolinera.latitud;
          this.longitudeD =  this.electrolinera.longitud;

          this.origin = { lat: this.latitude, lng: this.longitude };
          this.destination = { lat: this.latitudeD, lng: this.longitudeD };

          console.log("Origen: "+this.latitude +", "+ this.longitude);   
          console.log("Destino: "+this.latitudeD +", "+ this.longitudeD); 
        });
        
        
      });
    //}
     
  }

  getElectrolinera(){
    this.servicio.getElectrolineraId(this.id).subscribe((ubicaciones) =>{
      this.electrolinera = ubicaciones;
      //console.log(this.electrolinera);
      this.latitudeD = this.electrolinera.latitud;
      this.longitudeD =  this.electrolinera.longitud;
      //console.log("Destino: "+this.latitudeD +", "+ this.longitudeD);  
    })
  }
  

}
