import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarCmPageRoutingModule } from './listar-cm-routing.module';

import { ListarCmPage } from './listar-cm.page';

import { ExpandableComponent } from '../components/expandable/expandable.component';

import { FilterapPipe } from '../pipes/filterap.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarCmPageRoutingModule
  ],
  declarations: [ListarCmPage,ExpandableComponent,FilterapPipe]
})
export class ListarCmPageModule {}
