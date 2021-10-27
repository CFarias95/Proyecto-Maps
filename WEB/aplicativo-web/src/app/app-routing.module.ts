import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ElectrolinerasComponent } from './pages/electrolineras/electrolineras.component';
import { ListElectrolinerasComponent } from './pages/list-electrolineras/list-electrolineras.component';
import { LoginComponent } from './auth/login/login.component';
import { PerfilComponent } from './auth/perfil/perfil.component';
import { PerfilesComponent } from './auth/perfiles/perfiles.component';
import { PerfilesAComponent } from './auth/perfiles-a/perfiles-a.component';
import { PerfilesIComponent } from './auth/perfiles-i/perfiles-i.component';
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
import { QcsVerComponent } from './pages/qcs-ver/qcs-ver.component';
import { ElectrolineraCComponent } from './pages/electrolinera-c/electrolinera-c.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './guards/auth.guard';


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
      { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
      { path: 'electrolinera', component: ElectrolinerasComponent,canActivate:[AuthGuard] },
      { path: 'list-electrolinera', component: ListElectrolinerasComponent,canActivate:[AuthGuard] },
      { path: 'register', component: RegisterComponent,canActivate:[AuthGuard] },
      { path: 'adduser', component: AdduserComponent,canActivate:[AuthGuard] },
      { path: 'notify', component: NotificacionesCComponent,canActivate:[AuthGuard] },
      { path: 'qcs', component: QcsListComponent,canActivate:[AuthGuard] },
      { path: 'qcsa', component: QcsListAComponent,canActivate:[AuthGuard] },
      { path: 'qcsr', component: QcsListRComponent,canActivate:[AuthGuard] },
      { path: 'qcsver/:id', component: QcsVerComponent,canActivate:[AuthGuard] },
      { path: 'perfil', component: PerfilComponent,canActivate:[AuthGuard] },
      { path: 'perfiles', component: PerfilesComponent,canActivate:[AuthGuard] },
      { path: 'perfilesa', component: PerfilesAComponent,canActivate:[AuthGuard] },
      { path: 'perfilesi', component: PerfilesIComponent,canActivate:[AuthGuard] },
      { path: 'editelectrolinera/:id', component: EditElectrolineraComponent,canActivate:[AuthGuard] },
      { path: 'notifyc', component: NotificacionesCreateComponent,canActivate:[AuthGuard] },
      { path: 'notifye/:id', component: NotificacionesEditComponent,canActivate:[AuthGuard] },
      { path: 'electroa', component: ListElectrolineraAComponent,canActivate:[AuthGuard] },
      { path: 'electroi', component: ListElectrolineraIComponent,canActivate:[AuthGuard] },
      { path: 'electro1', component: ElectrolineraCComponent,canActivate:[AuthGuard] },
      
      { path: '', redirectTo: 'perfil', pathMatch: 'full' },
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
