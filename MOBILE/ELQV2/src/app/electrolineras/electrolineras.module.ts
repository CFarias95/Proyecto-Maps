import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectrolinerasPageRoutingModule } from './electrolineras-routing.module';

import { ElectrolinerasPage } from './electrolineras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectrolinerasPageRoutingModule
  ],
  declarations: [ElectrolinerasPage]
})
export class ElectrolinerasPageModule {}
