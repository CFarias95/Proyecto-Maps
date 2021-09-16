import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiasPageRoutingModule } from './noticias-routing.module';

import { NoticiasPage } from './noticias.page';

import { ExpandableComponent } from '../components/expandable/expandable.component';
import { FilternPipe } from '../pipes/filtern.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiasPageRoutingModule
  ],
  declarations: [NoticiasPage,ExpandableComponent,FilternPipe]
})
export class NoticiasPageModule {}
