import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebasestorageService } from '../services/firebasestorage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  lugares:any;
  icon = {
    url: 'https://firebasestorage.googleapis.com/v0/b/integracion-maps-304321.appspot.com/o/image%20(2).png?alt=media&token=054b2fda-4c08-4885-aa45-ed72e9924eab',
    scaledSize: {
      height: 60, width: 60
  }};
  slideOpts = {
    initialSlide: 0,
    speed: 100,
    loop: true,
    allowSlideNext: true,
    allowTouchMove: true,
    allowSlidePrev: true,

  };

  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  
  constructor( private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, 
    private servicio: FirebasestorageService ) {}

  ngOnInit() {

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      //this.setCurrentLocation();
      // this.renderMarker();
      // console.log( "LUGARES "+ this.lugares); 
      
      this.geoCoder = new google.maps.Geocoder;
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 20;
          //console.log("LAtitus, LONGITUD "+this.latitude+ " "+ this.longitude);
          //this.getAddress(this.latitude, this.longitude);
        });
      }

      this.servicio.ObtenerElectrolineras().subscribe((r)=>{
        this.lugares= r.map(i =>
          {
          this.lugares = i.payload.doc.data() as {}; 
          const id = i.payload.doc.id; 
          return {id, ...this.lugares} 
          }       
        );
        console.log( "LUGARES "+ this.lugares); 
      })

      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //   types: ["address"]
      // });
      
      console.log("LAtitus, LONGITUD "+this.latitude+ " "+ this.longitude);

      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }
      //     //set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.zoom = 20;

      //   });
      // });

      

    });

    

  }

  renderMarker(){
 
  }

  private setCurrentLocation() {
        
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


  reElectroC(){
    this.router.navigate(['login']);
  }
  
}
