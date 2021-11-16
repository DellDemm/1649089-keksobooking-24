import './generation-offers.js';
import './form.js';
import './map.js';
import { renderMarkers, resetMarker } from './map.js';

const ALERT_TIME = 5000;
const showAlert = (message) =>{
  const containerAlert = document.createElement('div');
  containerAlert.style.zIndex = 100;
  containerAlert.style.position = 'absolute';
  containerAlert.style.left = 0;
  containerAlert.style.right = 0;
  containerAlert.style.top = 0;
  containerAlert.style.padding = '10px 3px';
  containerAlert.style.fontSize = '30px';
  containerAlert.style.textAlign = 'center';
  containerAlert.style.backgroundColor = 'red';

  containerAlert.textContent = message;

  document.body.append(containerAlert);

  setTimeout(()=>{
    containerAlert.remove();
  },ALERT_TIME);
};

const MAX_ADD = 10;
const form = document.querySelector('.ad-form');

const clearForm = () =>{
  form.reset();
};

const resetForm = () =>{
  clearForm();
  resetMarker();
};

const getData = () =>{
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response)=>{
      if(response.ok){
        response.json()
          .then((offers)=>{
            renderMarkers(offers.slice(0,MAX_ADD));
          });
      }else{
        showAlert('Не удалось получить данные!');
      }
    })
    .catch(()=>{
      showAlert('Не удалось получить данные!');},
    );
};

const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const successClone = success.cloneNode(true);
const errorClone = error.cloneNode(true);

const isEscKey = (evt) => evt.key ==='Escape';

const appendInBody = function(element) {
  body.appendChild(element);
  document.addEventListener('keydown',(evt)=>{
    if (isEscKey(evt)){
      element.remove();
    }
  });
  element.addEventListener('click',()=>{
    element.remove();
  });
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
getData();
sendData();
