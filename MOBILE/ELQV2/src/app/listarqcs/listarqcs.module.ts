import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarqcsPageRoutingModule } from './listarqcs-routing.module';

import { ListarqcsPage } from './listarqcs.page';

import { ExpandableComponent } from '../components/expandable/expandable.component';

import { FiltercrPipe } from '../pipes/filtercr.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarqcsPageRoutingModule
  ],
  declarations: [ListarqcsPage,ExpandableComponent,FiltercrPipe]
})
export class ListarqcsPageModule {}
