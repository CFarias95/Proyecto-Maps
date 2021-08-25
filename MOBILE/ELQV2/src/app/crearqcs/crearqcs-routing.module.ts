import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearqcsPage } from './crearqcs.page';

const routes: Routes = [
  {
    path: '',
    component: CrearqcsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearqcsPageRoutingModule {}
