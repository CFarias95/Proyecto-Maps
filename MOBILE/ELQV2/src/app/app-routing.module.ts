import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }, */
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'electrolineras',
    loadChildren: () => import('./electrolineras/electrolineras.module').then( m => m.ElectrolinerasPageModule)
  },
  {
    path: 'crearqcs',
    loadChildren: () => import('./crearqcs/crearqcs.module').then( m => m.CrearqcsPageModule)
  },
  {
    path: 'ruta/:id',
    loadChildren: () => import('./ruta/ruta.module').then( m => m.RutaPageModule)
  },
  {
    path: 'listarqcs',
    loadChildren: () => import('./listarqcs/listarqcs.module').then( m => m.ListarqcsPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'promos',
    loadChildren: () => import('./promos/promos.module').then( m => m.PromosPageModule)
  },
  {
    path: 'electolinera/:id',
    loadChildren: () => import('./electolinera/electolinera.module').then( m => m.ElectolineraPageModule)
  },  {
    path: 'listar-cm',
    loadChildren: () => import('./listar-cm/listar-cm.module').then( m => m.ListarCmPageModule)
  },
  {
    path: 'listar-su',
    loadChildren: () => import('./listar-su/listar-su.module').then( m => m.ListarSuPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
