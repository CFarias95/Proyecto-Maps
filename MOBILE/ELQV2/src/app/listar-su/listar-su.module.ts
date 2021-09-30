import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarSuPageRoutingModule } from './listar-su-routing.module';

import { ListarSuPage } from './listar-su.page';
import { ExpandableComponent } from '../components/expandable/expandable.component';

import { FilterrqPipe } from '../pipes/filterrq.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarSuPageRoutingModule
  ],
  declarations: [ListarSuPage,ExpandableComponent,FilterrqPipe]
})
export class ListarSuPageModule {}
