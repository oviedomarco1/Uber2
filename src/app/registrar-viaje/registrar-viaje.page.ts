import { Component, OnInit, ElementRef, ViewChild, NgZone} from '@angular/core';
import type { Animation } from '@ionic/angular';
import {AnimationController, IonCard, IonCardContent, Platform} from '@ionic/angular';
declare var google: any;
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

//interfaz para guardar la info del registro del viaje
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
  selector: 'app-registrar-viaje',
  templateUrl: './registrar-viaje.page.html',
  styleUrls: ['./registrar-viaje.page.scss'],
})
export class RegistrarViajePage implements OnInit {
  @ViewChild('map') mapElement: ElementRef | undefined;
  public map: any;
  public start: any = 'Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile';
  //public end: any = 'Gabriel Donoso, Melipilla';
  public latitude: any;
  public longitude: any;
  public directionsService: any;
  public directionsDisplay: any;
  public autocompleteItems: any;

  toAdd: Viaje = {
    id: 0,
    fecha: '',
    hora: '',
    precio: 0,
    capacidad: 0,
    telefono: '',
    destino: 'Lider, Melipilla'
  }

  async crearViaje(){
    let viajes = await this.storage.get("viajes") || []
    this.toAdd.id = viajes.length + 1
    viajes.push(this.toAdd)
    this.storage.set("viajes", viajes)
    console.log(viajes)
  }
  
  constructor(private sss: AnimationController, private zone: NgZone, private platform: Platform, private storage: Storage ) {}

  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.initMap()
    })
  }
  initMap() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    let mapOptions = {
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute();
  }
  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.toAdd.destino,
      travelMode: 'DRIVING'
    }, (response: any, status: string) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  updateSearchResults() {
    let GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.toAdd.destino == '') {
      this.autocompleteItems = [];
      return;
  }
  GoogleAutocomplete!.getPlacePredictions({ input: this.toAdd.destino },
    (predictions: any, status: any) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction: any) => {
          this.autocompleteItems!.push(prediction);
        });
      });
    });
  }
  selectSearchResult(item: any) {
    this.toAdd.destino = item.description
    this.autocompleteItems = []
    this.initMap()
  }

  async ngOnInit() {

    await this.storage.create();
    let inputs = document.querySelector(
      '.contenedor-ion-input'
    ) as HTMLDivElement;
    this.sss
      .create()
      .addElement(inputs)
      .duration(450)
      .iterations(1)
      .keyframes([
        {
          offset: 0,
          transform: 'translateY(0%) translateX(100%) rotate(0deg)',
          opacity: 0,
        },
        {
          offset: 1,
          transform: 'translateY(0) translateX(0) rotate(0deg)',
          opacity: 1,
        },
      ])
      .play();
  }
}
