import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarCmPage } from './listar-cm.page';

const routes: Routes = [
  {
    path: '',
    component: ListarCmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarCmPageRoutingModule {}
