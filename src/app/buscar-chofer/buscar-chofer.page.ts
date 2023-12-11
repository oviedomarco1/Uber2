import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AnimationController, ToastController, Platform, NavController} from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@ionic/storage-angular';
import { App } from '@capacitor/app';
declare var google: any; //1


export interface Viaje {
  id: number,
  userId: string,
  fecha: string,
  hora: string,
  capacidad: number,
  destino: string,
  telefono: string,
  precio: number,
  pasajeros: number,
  viajeAceptado: boolean, //quitar
}

@Component({
  selector: 'app-buscar-chofer',
  templateUrl: './buscar-chofer.page.html',
  styleUrls: ['./buscar-chofer.page.scss'],
})
export class BuscarChoferPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef | undefined;
  public map: any;
  public start: any = 'Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile';
  //public end: any = 'Gabriel Donoso, Melipilla';
  public latitude: any;
  public longitude: any;
  public directionsService: any;
  public directionsDisplay: any;
  public autocompleteItems: any;
  viajes: Viaje[] = [];

  toAdd: Viaje = {
    id: 0,
    userId: '',
    fecha: '',
    hora: '',
    precio: 0,
    capacidad: 0,
    telefono: '',
    destino: 'Lider, Melipilla',
    pasajeros: 0,
    viajeAceptado: true //quitar
  }

  constructor(
    private sss: AnimationController,
    private aaa: ToastController,
    private storage: Storage,
    private platform: Platform,
    private zone: NgZone,
    private navCtrl: NavController
  ) {}

  

  // async mostrarMapa() {
  //   const apiKey = 'AIzaSyCbrmuTe-EXMCNoU-akfVG5WXn4riB4czg';
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   const mapRef = document.getElementById('map')!;

  //   const newMap = await GoogleMap.create({
  //     id: 'my-map', // Unique identifier for this map instance
  //     element: mapRef, // reference to the capacitor-google-map element
  //     apiKey: apiKey, // Your Google Maps API Key
  //     config: {
  //       center: {
  //         // The initial position to be rendered by the map
  //         lat: -33.69396, //-33.693960 - coordinates.coords.latitude
  //         lng: -71.214395, //-71.214395 - coordinates.coords.longitude
  //       },
  //       zoom: 15, // The initial zoom level to be rendered by the map
  //     },
  //   });
  // }

  async ngOnInit() {
    await this.storage.create();
  }

  async ionViewDidEnter() {
    this.viajes = (await this.storage.get('viajes')) || [];
    await this.platform.ready().then(() => {
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

  async aceptarViaje(id: number, userId: string) {
    for (let viaje of this.viajes) {
      if (viaje.id == id && viaje.userId === userId) {
        if (viaje.pasajeros >= viaje.capacidad) {
          this.showToast('No quedan asientos disponibles');
          return;
        }
        if (viaje.viajeAceptado) {
          viaje.pasajeros = viaje.pasajeros - 1;
          this.showToast('Viaje cancelado');
        } else {
          viaje.pasajeros = viaje.pasajeros + 1;
          this.showToast('¡Te has unido al viaje!');
        }
        viaje.viajeAceptado = !viaje.viajeAceptado;
        // this.showToast('¡Te has unido al viaje!');
        // await this.storage.set('viajes', this.viajes);
        await this.storage.set('viajes', this.viajes.filter(viaje => viaje.userId === userId));
        return;
      }
      this.aaa.create();
    }
  }

  async showToast(texto: string) {
    const toast = await this.aaa.create({
      message: texto,
      duration: 500,
      position: 'top',
    });

    await toast.present();
  }

  abrirWhatsapp() {
    for (let viaje of this.viajes) {
      if (this.platform.is('mobile')) {
        // Forma el enlace de WhatsApp
        const enlaceWhatsapp = `whatsapp://send?phone=${viaje.telefono}`;
        window.open(enlaceWhatsapp, '_system');
      } else if (typeof window.open !== 'undefined') {
        window.open(`https://web.whatsapp.com/send?phone=${viaje.telefono}`);
      } else {
        console.warn(
          'Esta función solo está disponible en dispositivos móviles.'
        );
      }
    }
  }
}
