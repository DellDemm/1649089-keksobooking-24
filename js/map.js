import {createPopup} from './generation-offers.js';
import { deactivatePage, activePage } from './page.js';
import { resetForm } from './form.js';
import { getData } from './server.js';
import {debounce} from './utils/debounce.js';

const DEFAULT_VALUE = 'any';
const DEFAULT_DEBOUNCE = 5000;
const TOKYO_LAT = 35.68000;
const TOKYO_LNG = 139.75000;

const elementForm = document.querySelector('.map__filters');
const typeElementFilter = elementForm.querySelector('select[name="housing-type"]');
const priceElementFilter = elementForm.querySelector('select[name="housing-price"]');
const roomsNumberElementFilter = elementForm.querySelector('select[name="housing-rooms"]');
const guestNumberElementFilter = elementForm.querySelector('select[name="housing-guests"]');
const featuresElementListFilter = elementForm.querySelectorAll('input[name="features"]');

const PRICE_RANGE_FILTER = {
  low:{
    from:0,
    to:10000,
  },
  middle:{
    from:10000,
    to:50000,
  },
  high:{
    from:50000,
  },
};
const resetButton = document.querySelector('.ad-form__reset');
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

address.value = `${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const mapData ={
  markers:[],
};

const renderMarkers = (offer) =>{
  offer.forEach((element) => {
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
    mapData.markers.push(marker);
  });
};

const removeMarkers = () =>{
  mapData.markers.forEach((marker)=>marker.remove());
  mapData.markers = [];
};

const resetMarker = () => {
  mainPinMarker.setLatLng({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  });
  address.value = `${mainPinMarker.getLatLng().lat.toFixed(5)}, ${mainPinMarker.getLatLng().lng.toFixed(5)}`;
};

resetButton.addEventListener('click', () => {
  resetMarker();
  address.value = '4';
  resetForm();
});

typeElementFilter.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
priceElementFilter.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
roomsNumberElementFilter.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));
guestNumberElementFilter.addEventListener('change', debounce(getData, DEFAULT_DEBOUNCE));

featuresElementListFilter.forEach((element)=>
  element.addEventListener('click',debounce(getData, DEFAULT_DEBOUNCE)),
);

function typeFilter (offers) {
  if (typeElementFilter.value !== DEFAULT_VALUE){
    offers = offers.filter((offer)=> offer.offer.type === typeElementFilter.value);
  }
  return offers;
}

const roomNumberFilter = (offers) =>{
  if (roomsNumberElementFilter.value !== DEFAULT_VALUE){
    const roomsNumber = Number(roomsNumberElementFilter.value);
    offers = offers.filter((offer)=>{
      if(!offer.offer.rooms){
        return false;
      }
      return Number(offer.offer.rooms) === roomsNumber;
    });
  }
  return offers;
};

const guestNumberFilter = (offers) =>{
  if (guestNumberElementFilter.value !== DEFAULT_VALUE){
    const questsNumber = Number(guestNumberElementFilter.value);
    offers = offers.offer.filter((offer) =>{
      if (typeof offer.offer.quests === 'undefined'){
        return false;
      }
      return Number(offer.offer.quests) === questsNumber;
    });
  }
  return offers;
};

const priceFilter = (offers) =>{
  const priceCurrent = PRICE_RANGE_FILTER[priceElementFilter.value];
  if (priceElementFilter.value !== DEFAULT_VALUE && priceCurrent){
    offers = offers.filter((offer)=>{
      if(!offer.offer.price){
        return false;
      }

      const priceValue = Number(offer.offer.price);
      if(priceValue >= priceCurrent.from){
        if(priceCurrent.to){
          if (priceValue < priceCurrent.to){
            return true;
          }
        }else{
          return true;
        }
      }
      return false;
    });
  }
  return offers;
};

const featuresFilter = (offers) =>{
  let filteredCards = offers;
  featuresElementListFilter.forEach((featuresElementFilter)=>{
    if (featuresElementFilter.checked) {
      filteredCards = filteredCards.filter((offer)=>{
        if(!offer.offer.features){
          return false;
        }
        return offer.offer.features.includes(featuresElementFilter.value);
      });
    }
  });
  return filteredCards;
};
export{renderMarkers, resetMarker, typeFilter, roomNumberFilter, guestNumberFilter, priceFilter, featuresFilter, removeMarkers};
