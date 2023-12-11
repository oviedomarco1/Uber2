import { Component } from '@angular/core';
import { AnimationController, IonModal, ToastController } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

export interface Viaje{
  id: number,
  hora: string,
  capacidad: number,
  destino: string,
  precio: number
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario = ""
  clave = ""

  mostrarError: boolean = false;

  constructor(private sss:AnimationController, private aaa:ToastController, private storage: Storage, private router: Router ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  validar(){
    if (this.usuario.length >= 5){
      if (this.clave.length >= 5 && /\d/.test(this.clave)){
        if(this.usuario == "Marco" && this.clave == "oviedo12" || this.usuario == "Diego" && this.clave == "chavez12"){
          this.router.navigate(['/buscar-chofer']);
          this.mostrarToast("¡Bienvenido "+ this.usuario + "! 🐼");
        }else{
          this.mostrarError = true;
        }
      }else{
        this.animarInput("#clave");
        this.mostrarError = true;
      }
    }else{
      this.animarInput("#usuario");
      this.mostrarError = true;
    }
  }
  animarInput(input:string){
      let user = document.querySelector(input) as HTMLInputElement
      this.sss.create().addElement(user).duration(200)
      .iterations(2).keyframes([
        { offset: 0, transform: 'scale(1)', background: '#48BFE3' },
        { offset: 0.5, transform: 'scale(1.2)' },
        { offset: 1, transform: 'scale(1)', background: '#4e86cb' },
      ]).play()
      user.focus()
    }
    async mostrarToast(texto:string) {
      const toast = await this.aaa.create({
        message: texto,
        duration: 1200,
        position: 'top',
        color: "dark"
      });
  
      await toast.present();
    }
  animarModal(){
    let modal = document.querySelector('.modal-entrada') as HTMLIonModalElement
    this.sss.create().addElement(modal).duration(200)
    .keyframes([
      { offset: 0, transform: 'translateY(20%) translateX(20%) rotate(0deg)', opacity: 0 },
      { offset: 1, transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
    ]).play()

  }

  
}
