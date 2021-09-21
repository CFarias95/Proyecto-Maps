import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectolineraPageRoutingModule } from './electolinera-routing.module';

import { ElectolineraPage } from './electolinera.page';

import { ExpandableComponent } from '../components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectolineraPageRoutingModule
  ],
  declarations: [ElectolineraPage,ExpandableComponent]
})
export class ElectolineraPageModule {}
