import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdduserComponent } from './auth/adduser/adduser.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ElectrolinerasComponent } from './pages/electrolineras/electrolineras.component';
import { ListElectrolinerasComponent } from './pages/list-electrolineras/list-electrolineras.component';
import { NotificacionesCComponent } from './pages/notificaciones-c/notificaciones-c.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { QcsListComponent } from './pages/qcs-list/qcs-list.component';
import { QcsListAComponent } from './pages/qcs-list-a/qcs-list-a.component';
import { QcsListRComponent } from './pages/qcs-list-r/qcs-list-r.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PerfilesComponent } from './auth/perfiles/perfiles.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { NotificacionesCreateComponent } from './pages/notificaciones-create/notificaciones-create.component';
import { EditElectrolineraComponent } from './pages/edit-electrolinera/edit-electrolinera.component';
import { NotificacionesEditComponent } from './pages/notificaciones-edit/notificaciones-edit.component';
import { PagesComponent } from './pages/pages.component';
import { ListElectrolineraAComponent } from './pages/list-electrolinera-a/list-electrolinera-a.component';
import { ListElectrolineraIComponent } from './pages/list-electrolinera-i/list-electrolinera-i.component';


import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ElectrolineraCComponent } from './pages/electrolinera-c/electrolinera-c.component';

import {NgxPaginationModule} from 'ngx-pagination';

import { GoogleMaps } from '@ionic-native/google-maps';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    DashboardComponent,
    ElectrolinerasComponent,
    NotificacionesEditComponent,
    ListElectrolinerasComponent,
    ListElectrolineraAComponent,
    ListElectrolineraIComponent,
    PerfilComponent,
    AdduserComponent,
    NotificacionesCreateComponent,
    ElectrolineraCComponent,
    EditElectrolineraComponent,
    NotificacionesCComponent,
    PerfilesComponent,
    QcsListComponent,
    QcsListAComponent,
    QcsListRComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    PagesComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
  ],
  providers: [AngularFirestore,GoogleMaps,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
