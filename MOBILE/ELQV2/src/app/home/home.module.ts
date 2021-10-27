import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { Component } from '@angular/core';
import { HomePageRoutingModule } from './home-routing.module';

import { NotificacionesComponent } from '../components/notificaciones/notificaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,NotificacionesComponent]
})
export class HomePageModule {}
