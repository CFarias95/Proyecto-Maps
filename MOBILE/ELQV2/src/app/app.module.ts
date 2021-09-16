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
import { FilterpPipe } from './pipes/filterp.pipe';
import { FilternPipe } from './pipes/filtern.pipe';
import { FilterdPipe } from './pipes/filterd.pipe';

@NgModule({
  declarations: [AppComponent, FilternPipe, FilterdPipe],
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

  providers: [GoogleMaps,{ provide: [ LocalNotifications, RouteReuseStrategy], useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
