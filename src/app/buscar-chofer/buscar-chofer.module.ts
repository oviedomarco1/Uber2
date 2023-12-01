import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarChoferPageRoutingModule } from './buscar-chofer-routing.module';

import { BuscarChoferPage } from './buscar-chofer.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // 1

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarChoferPageRoutingModule
  ],
  declarations: [BuscarChoferPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // 2
})
export class BuscarChoferPageModule {}
