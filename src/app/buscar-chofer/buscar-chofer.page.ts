import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';

export interface Viaje{
  id: number,
  fecha: string,
  hora: string,
  capacidad: number,
  destino: string,
  telefono: string,
  precio: number
}

@Component({
  selector: 'app-buscar-chofer',
  templateUrl: './buscar-chofer.page.html',
  styleUrls: ['./buscar-chofer.page.scss'],
})
export class BuscarChoferPage implements OnInit {

  viajes:Viaje[] = []

  constructor(private sss: AnimationController, private aaa: ToastController, private storage:Storage) { }

  async mostrarMapa() {
    const apiKey = 'AIzaSyCbrmuTe-EXMCNoU-akfVG5WXn4riB4czg';
    const coordinates = await Geolocation.getCurrentPosition();
    const mapRef = document.getElementById('map')!;

    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: -33.693960, //-33.693960 - coordinates.coords.latitude
          lng: -71.214395, //-71.214395 - coordinates.coords.longitude
        },
        zoom: 15, // The initial zoom level to be rendered by the map
      },
    });
  }

  async ngOnInit() {
    // this.mostrarMapa()
  }

  async ionViewDidEnter(){
    this.viajes = await this.storage.get("viajes") || []
  }



}
