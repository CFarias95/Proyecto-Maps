import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'electrolineras',
    loadChildren: () => import('./electrolineras/electrolineras.module').then( m => m.ElectrolinerasPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'crearqcs',
    loadChildren: () => import('./crearqcs/crearqcs.module').then( m => m.CrearqcsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ruta/:id',
    loadChildren: () => import('./ruta/ruta.module').then( m => m.RutaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'listarqcs',
    loadChildren: () => import('./listarqcs/listarqcs.module').then( m => m.ListarqcsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then( m => m.NoticiasPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'promos',
    loadChildren: () => import('./promos/promos.module').then( m => m.PromosPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'electolinera/:id',
    loadChildren: () => import('./electolinera/electolinera.module').then( m => m.ElectolineraPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'listar-cm',
    loadChildren: () => import('./listar-cm/listar-cm.module').then( m => m.ListarCmPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'listar-su',
    loadChildren: () => import('./listar-su/listar-su.module').then( m => m.ListarSuPageModule),
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
