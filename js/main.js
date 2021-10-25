//Импортирую генераторы рандомных чисел
import {getRandomPositiveFloat} from './utils/get-random-positive-float';
import {getRandomPositiveInteger} from './utils/get-random-positive-integer';

// Добавляю массивы с данными
const TITLES = [
  'Девичье гнездышко',
  'Световая симфония',
  'Карнавал текстур и красок',
  'Продуманная рациональность',
  'Приют всех муз',
  'Яркое отражение индивидуальности'];
const PRICE = {min:'1000', max:'50000'};
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ROOMS = {min:'1', max:'5'};
const GUESTS = {min: '1', max:'5'};
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'ИДЕАЛЬНЫЙ ВАРИАНТ ДЛЯ ТЕХ, КТО ХОЧЕТ РАЗМЕСТИТЬСЯ В КВАРТИРЕ С НОВЫМ РЕМОНТОМ В ЦЕНТРЕ ГОРОДА',
  'Фото соответствуют 100 %. Шикарная 2-х квартира , премиум класса, дорогим ремонтом и мебелью, студия с отдельной столовой и спальной комнатой.',
  'Квартира в самом сердце города! Без комиссии. Собственник.',
  'Представляем вашему вниманию очень уютную квартиру в интересном дизайнерском стиле Лофт.',
  'Cдается комплекс со всеми возможными удобствами для всех видов мероприятий посуточно и на длительный срок.'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LOCATION = {
  lat:{
    min: '35.65000',
    max: '35.70000',
  },
  lng:{
    min: '139.70000',
    max: '139.80000',
  },
};
// функция создания объявления
const createOffer = () => ({
  return: {
    author: {
      avatar:'img/avatars/user{{xx}}.png'
    },
    offer: {
      title: TITLES[getRandomPositiveInteger(0,TITLES.length - 1)],
      address: [
        LOCATION.lat,
        LOCATION.lng,
      ],
      price: getRandomPositiveInteger(PRICE.min, PRICE.max),
      type: TYPES[getRandomPositiveInteger(0,TYPES.length - 1)],
      rooms: getRandomPositiveInteger(ROOMS.min, ROOMS.max),
      quests: getRandomPositiveInteger(GUESTS.min, GUESTS.max),
      checkin: CHECKIN[getRandomPositiveInteger(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomPositiveInteger(0,CHECKOUT.length - 1)],
      features: FEATURES[getRandomPositiveInteger(0, FEATURES.length - 1)],
      descroption: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
      photos: PHOTOS[getRandomPositiveInteger(0, PHOTOS.length - 1)],
    },
    location: {
      lat: getRandomPositiveFloat(LOCATION.lat.min, LOCATION.lat.max, 5),
      lng: getRandomPositiveFloat(LOCATION.lng.min, LOCATION.lng.max, 5),
    },
  },
});
const ADSOFFERS = [];
for(let count = 0; count < 10; count++){
  ADDSOFFERS[count] = createOffer[count];
};
