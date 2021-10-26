//Функция возврата целого числа из заданного диапазлна(Включительно)
function getRandom(min, max) {
  if (max <= min){
    throw('Введены не коректные значения');
  }
  return Math.floor(Math.random()*(max-min))+min;
}
// функция возврата заданного числа из диапазона
const getRandomIntFromToWithComma = (from, to, countSignsAfterComma) => {
  if (from < 0 || to <= from) {
    throw('Введены не коректные значения');
  }
  return +(Math.random() * (to - from)).toFixed(countSignsAfterComma) + from;
};
// Добавляю массивы с данными
const TITLES = [
  'Девичье гнездышко',
  'Световая симфония',
  'Карнавал текстур и красок',
  'Продуманная рациональность',
  'Приют всех муз',
  'Яркое отражение индивидуальности',];
const PRICE = {min:1000, max:10000};
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ROOMS ={min:1, max:5};
const GUESTS = {min: 1, max:5};
const TIMES = ['12:00', '13:00', '14:00'];
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
    min: 35.65000,
    max: 35.70000,
  },
  lng:{
    min: 139.70000,
    max: 139.80000,
  },
};

//функция выбора случайных Удобств
const addFeatures = (featuresLits) => {
  const features = [];
  features.push(featuresLits[getRandom(0,5)]);
  for (let ft = 0; ft < 6; ft++) {
    const randomValue = getRandom(0, 5);
    if (features.includes(featuresLits[randomValue])) {
      continue;
    }else{
      features.push(featuresLits[randomValue]);
    }
  }
  return features;
};
//Функция выбора случайных фото
const addPhotos = (photosLits) => {
  const photos = [];
  photos.push(photosLits[getRandom(0,2)]);
  for (let ft = 0; ft < 3; ft++) {
    const randomValue = getRandom(0, 2);
    if (photos.includes(photosLits[randomValue])) {
      continue;
    }else{
      photos.push(photosLits[randomValue]);
    }
  }
  return photos;
};

// функция создания объявления
const createOffer = () => {
  const LAT = getRandomIntFromToWithComma(LOCATION.lat.min, LOCATION.lat.max, 5);
  const LNG = getRandomIntFromToWithComma(LOCATION.lng.min, LOCATION.lng.max, 5);
  return {
    author: {
      avatar:`img/avatars/user${getRandom(1,10)}.png`,
    },
    offer: {
      title: TITLES[getRandom(0,TITLES.length - 1)],
      address: `${LAT},${LNG}`,
      price: getRandom(PRICE.min, PRICE.max),
      type: TYPES[getRandom(0,TYPES.length - 1)],
      rooms: getRandom(ROOMS.min, ROOMS.max),
      quests: getRandom(GUESTS.min, GUESTS.max),
      checkin: TIMES[getRandom(0, TIMES.length - 1)],
      checkout: TIMES[getRandom(0, TIMES.length - 1)],
      features: addFeatures(FEATURES),
      description: DESCRIPTIONS[getRandom(0,DESCRIPTIONS.length-1)],
      photos: addPhotos(PHOTOS),
    },
    location: {
      lat: LAT,
      lng: LNG,
    },
  };
};

const adoffer = Array.from({ length: 10 }, createOffer);
throw(adoffer);
