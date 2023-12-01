import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',//home
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',//por defecto tiene que ir a home
    pathMatch: 'full'
  },
  {
    path: 'buscar-chofer',
    loadChildren: () => import('./buscar-chofer/buscar-chofer.module').then( m => m.BuscarChoferPageModule)
  },
  {
    path: 'registrar-viaje',
    loadChildren: () => import('./registrar-viaje/registrar-viaje.module').then( m => m.RegistrarViajePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
