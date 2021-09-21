import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectolineraPage } from './electolinera.page';

const routes: Routes = [
  {
    path: '',
    component: ElectolineraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectolineraPageRoutingModule {}
