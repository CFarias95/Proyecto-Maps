import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AgmCoreModule } from '@agm/core';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LocalNotifications } from "@ionic-native/local-notifications";
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDx_q0nhUYOH2dugo66foOjPLUbwRL1U7s',
      libraries: ['places'],

    }),
    AngularFireModule.initializeApp (environment.firebaseConfig)],

  providers: [ GoogleMaps, GooglePlus,AndroidPermissions,NativeStorage, LocationAccuracy,Geolocation,{ provide: [LocalNotifications, RouteReuseStrategy], useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
