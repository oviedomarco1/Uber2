import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilChoferPageRoutingModule } from './perfil-chofer-routing.module';

import { PerfilChoferPage } from './perfil-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilChoferPageRoutingModule
  ],
  declarations: [PerfilChoferPage]
})
export class PerfilChoferPageModule {}
