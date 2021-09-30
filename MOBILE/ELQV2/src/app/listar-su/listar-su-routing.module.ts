import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarSuPage } from './listar-su.page';

const routes: Routes = [
  {
    path: '',
    component: ListarSuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarSuPageRoutingModule {}
