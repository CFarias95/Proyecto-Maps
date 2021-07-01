import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMaps, GoogleMap, CameraPosition, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  slideOpts = {
    initialSlide: 1,
    speed: 1
  };
  constructor() {}


}
