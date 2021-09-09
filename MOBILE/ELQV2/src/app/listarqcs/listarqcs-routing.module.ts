import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarqcsPage } from './listarqcs.page';

const routes: Routes = [
  {
    path: '',
    component: ListarqcsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarqcsPageRoutingModule {}
