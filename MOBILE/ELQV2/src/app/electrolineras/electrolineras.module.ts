import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { ElectrolinerasPage } from './electrolineras.page';
import { ExpandableComponent } from '../components/expandable/expandable.component';

import { FilterepPipe } from '../pipes/filterep.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ElectrolinerasPage,
      },
    ]),
  ],
  declarations: [ElectrolinerasPage, ExpandableComponent,FilterepPipe]
})
export class ElectrolinerasPageModule {}
