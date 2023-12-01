import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilChoferPage } from './perfil-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilChoferPageRoutingModule {}
