import {simularOffer, createPopup} from './generation-offers.js';
import { deactivatePage, activePage } from './form.js';

const TOKYO_LAT = 35.68000;
const TOKYO_LNG = 139.75000;

const resetForm = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');

deactivatePage();

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activePage();
  })
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapCanvas);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

[simularOffer].forEach((element) =>{

  const pin = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: element.location.lat,
      lng: element.location.lng,
    },
    {
      icon:pin,
    },
  );

  marker
    .addTo(mapCanvas)
    .bindPopup(createPopup(element));
});

resetForm.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  });
});
