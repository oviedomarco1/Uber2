import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarChoferPage } from './buscar-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarChoferPageRoutingModule {}
