const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const successClone = success.cloneNode(true);
const errorClone = error.cloneNode(true);

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
export{showAlert,successClone,errorClone,appendInBody};
