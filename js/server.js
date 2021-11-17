import { renderMarkers, typeFilter, roomNumberFilter, guestNumberFilter ,priceFilter,featuresFilter, removeMarkers } from './map.js';
import { resetForm } from './form.js';
import { showAlert, appendInBody, successClone, errorClone } from './popup.js';

const filterOffers =(offers) =>{
  offers = typeFilter(roomNumberFilter(guestNumberFilter(priceFilter(featuresFilter(offers)))));
  return offers;
};

const MAX_ADD = 10;

const form = document.querySelector('.ad-form');

const getData = () =>{
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response)=>{
      if(response.ok){
        response.json()
          .then((offers)=>{
            removeMarkers();
            renderMarkers(filterOffers((offers)).slice(0,MAX_ADD));
          });
      }else{
        showAlert('Не удалось получить данные!');
      }
    })
    .catch(()=>{
      showAlert('Не удалось получить данные!');},
    );
};

const sendData =() =>{
  form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) =>{
        if(response.ok){
          appendInBody(successClone);
          resetForm();
        }else{
          appendInBody(errorClone);
        }
      })
      .catch(()=>{
        appendInBody(errorClone);
      });
  });
};
export{getData, sendData};
