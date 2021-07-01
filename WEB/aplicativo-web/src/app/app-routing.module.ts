import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ElectrolinerasComponent } from './pages/electrolineras/electrolineras.component';
import { ListElectrolinerasComponent } from './pages/list-electrolineras/list-electrolineras.component';
import { LoginComponent } from './auth/login/login.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { PerfilesComponent } from './auth/perfiles/perfiles.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdduserComponent } from './auth/adduser/adduser.component';
import { NotificacionesCComponent } from './pages/notificaciones-c/notificaciones-c.component';
import { NotificacionesCreateComponent } from './pages/notificaciones-create/notificaciones-create.component';
import { NotificacionesEditComponent } from './pages/notificaciones-edit/notificaciones-edit.component';
import { EditElectrolineraComponent } from './pages/edit-electrolinera/edit-electrolinera.component';
import { ListElectrolineraAComponent } from './pages/list-electrolinera-a/list-electrolinera-a.component';
import { ListElectrolineraIComponent } from './pages/list-electrolinera-i/list-electrolinera-i.component';
import { QcsListComponent } from './pages/qcs-list/qcs-list.component';
import { QcsListAComponent } from './pages/qcs-list-a/qcs-list-a.component';
import { QcsListRComponent } from './pages/qcs-list-r/qcs-list-r.component';
import { ElectrolineraCComponent } from './pages/electrolinera-c/electrolinera-c.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path: 'login', component: LoginComponent }, 
  {
    path: 'panel',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'electrolinera', component: ElectrolinerasComponent },
      { path: 'list-electrolinera', component: ListElectrolinerasComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'adduser', component: AdduserComponent },
      { path: 'notify', component: NotificacionesCComponent },
      { path: 'qcs', component: QcsListComponent },
      { path: 'qcsa', component: QcsListAComponent },
      { path: 'qcsr', component: QcsListRComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'perfiles', component: PerfilesComponent },
      { path: 'editelectrolinera/:id', component: EditElectrolineraComponent },
      { path: 'notifyc', component: NotificacionesCreateComponent },
      { path: 'notifye/:id', component: NotificacionesEditComponent },
      { path: 'electroa', component: ListElectrolineraAComponent },
      { path: 'electroi', component: ListElectrolineraIComponent },
      { path: 'electro1', component: ElectrolineraCComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
