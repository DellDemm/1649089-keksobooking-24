const MIN_NAME = 30;
const MAX_NAME = 100;
const HOUSES_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');
const roomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = form.children;
const interactiveMapFilters = mapFilters.children;
const disableForm = 'ad-form--disabled';
const formType = form.querySelector('#type');
const formTimeIn = form.querySelector('#timein');
const formTimeOut = form.querySelector('#timeout');

//Дективайия фильтров и формы

const deactivatePage = () =>{
  form.classList.add(disableForm);
  mapFilters.classList.add(disableForm);
  [...mapFeatures,...interactiveMapFilters].forEach((element)=>{
    element.setAttribute('disabled','disabled');
  });
};
deactivatePage();

//Активация страницы
const activePage =()=>{
  form.classList.remove(disableForm);
  mapFilters.classList.remove(disableForm);
  [...mapFeatures, ...interactiveMapFilters].forEach((element) =>{
    element.removeAttribute('disabled');
  });
};
activePage();
export {deactivatePage, activePage};

//Проверка на заполненость обязательных полей
formTitle.addEventListener('invalid',()=>{
  if (formTitle.validity.valueMissing){
    formTitle.setCustomValidity('Поле является обязательным для заполнения');
  }
});

//Проверка на кол-во символов в заголовке
formTitle.addEventListener('input',() =>{
  const lengthValue = formTitle.value.lenght;
  if(lengthValue < MIN_NAME){
    formTitle.setCustomValidity(`Минимальное количетсво символов ${MIN_NAME}`);
  } else if(lengthValue > MAX_NAME){
    formTitle.setCustomValidity(`Максимальное количество символов ${MAX_NAME}`);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

//Проверка заполнения поля с ценой
formPrice.addEventListener('invalid',() =>{
  if (formPrice.validity.valueMissing){
    formPrice.setCustomValidity('Поле является обязательным для заполнения');
  }
});

//Проверка цены
formPrice.addEventListener('input',()=>{
  if(formPrice.validity.rangeOverflow){
    formPrice.setCustomValidity('Введена слишком высокая цена');
  }else if(formPrice.value < HOUSES_PRICE[formType.value]){
    formPrice.setCustomValidity(`Для этого типа жилья минимальная стоимость ${HOUSES_PRICE[formType.value]}`);
  } else {
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
});

//Сравнения количества комнат и количества гостей
roomNumber.addEventListener('change',()=>{
  if(Number(roomNumber.value)===100 && Number(formCapacity.value)!==0){
    roomNumber.setCustomValidity('Не для гостей, укажите количество мест');
  }else if(Number(roomNumber.value) < Number(formCapacity.value)){
    roomNumber.setCustomValidity('Мало комнат! Измените количество мест!');
  }else if(Number(formCapacity.value)===0 && Number(roomNumber.value)=== 100){
    formCapacity.setCustomValidity('Необходимо увеличить вместимость');
  }else{
    roomNumber.setCustomValidity('');
  }
  roomNumber.reportValidity('');
});

formCapacity.addEventListener('change',() =>{
  if(Number(formCapacity.value)===0 && Number(roomNumber.value)!==100){
    formCapacity.setCustomValidity('только 100 комнат');
  }else if(Number(roomNumber.value)< Number(formCapacity.value)){
    formCapacity.setCustomValidity('Измените количество комнат');
  }else if(Number(formCapacity.value)===0 && Number(roomNumber.value)===100){
    roomNumber.setCustomValidity('');
  }else {
    formCapacity.setCustomValidity('');
  }
  formCapacity.reportValidity();
});

//Функция сравнения типа жилья и цены

formType.addEventListener('change', () => {
  formPrice.setAttribute('min',HOUSES_PRICE[formType.value]);
  formPrice.setAttribute('placeholder', HOUSES_PRICE[formType.value]);

  if(formPrice.value< HOUSES_PRICE[formType.value]){
    formPrice.setCustomValidity(`Минимальная цена: ${HOUSES_PRICE[formType.value]}`);
  } else {
    formPrice.setCustomValidity('Корректная цена');
  }
  formPrice.reportValidity();
});

// Сравнение времени въезда и выезда

formTimeIn.addEventListener('change', () => {
  if(formTimeIn.value !== formTimeOut.value){
    formTimeIn.value = formTimeOut.value;
  } else {
    formTimeOut.value = formTimeIn.value;
  }
});
