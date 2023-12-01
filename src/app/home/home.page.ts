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

  constructor(private sss:AnimationController, private aaa:ToastController, private storage: Storage, private router: Router ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  //En validar() debería mostrar el Toast que hicimos en clases, pero no funca. 
  //Por ahora sólo anima los inputs de usuario y clave.
  validar(){
    if (this.usuario.length >= 5){
      if (this.clave.length >= 5 && /\d/.test(this.clave)){
        if(this.usuario == "Marco" && this.clave == "oviedo12" || this.usuario == "Diego" && this.clave == "chavez12"){
          this.mostrarToast("¡Bienvenido "+ this.usuario + "! 🐼");
          this.router.navigate(['/buscar-chofer']);
        }else{
          this.mostrarToast("Datos incorrectos");
        }
      }else{
        this.animarInput("#clave");
      }
    }else{
      this.animarInput("#usuario");
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
        duration: 3000,
        position: 'top',
        color: "dark"
      });
  
      await toast.present();
    }
  animarModal(){
    let modal = document.querySelector('.modal-entrada') as HTMLIonModalElement
    this.sss.create().addElement(modal).duration(300)
    .keyframes([
      { offset: 0, transform: 'translateY(100%) translateX(100%) rotate(30deg)', opacity: 0 },
      { offset: 1, transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
    ]).play()

  }

  
}
