import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearqcsPageRoutingModule } from './crearqcs-routing.module';

import { CrearqcsPage } from './crearqcs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule, 
    CrearqcsPageRoutingModule
  ],
  declarations: [CrearqcsPage]
})
export class CrearqcsPageModule {}

