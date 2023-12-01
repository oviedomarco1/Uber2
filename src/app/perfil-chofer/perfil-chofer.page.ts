import { Component, OnInit } from '@angular/core';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil-chofer',
  templateUrl: './perfil-chofer.page.html',
  styleUrls: ['./perfil-chofer.page.scss'],
})
export class PerfilChoferPage implements OnInit {

  viajes: any[] = []
  usuario = "Marco"

  constructor(private storage: Storage ) { }

  async ngOnInit() {
    await this.storage.create();
    
  }
  async ionViewDidEnter(){
    this.viajes = await this.storage.get("viajes") || []
    this.viajes.filter((v)=>{
      return v.chofer = this.usuario
    })
  }

}
