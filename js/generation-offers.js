import { createOffer} from './data.js';

const mapCanvas = document.querySelector('#map-canavas');
const addCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const addFragment = document.createDocumentFragment();
const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const simularOffer = createOffer();
simularOffer.forEach((item) => {
  const addElement = addCardTemplate.cloneNode(true);

  item.author.avatar
    ? addElement.querySelector('.popup__avatar').src = item.author.avatar
    : addElement.querySelector('.popup__avatar').classList.add('visually-hidden');
  item.offer.title
    ? addElement.querySelector('.popup__title').textContent = item.offer.title
    : addElement.querySelector('.popup__title').classList.add('visually-hidden');
  item.offer.address
    ? addElement.querySelector('.popup__text--address').textContent = item.offer.address
    : addElement.querySelector('.popup__text--addres').classList.add('visually-hidden');
  item.offer.price
    ? addElement.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`
    : addElement.querySelector('popup__text--price').classList.add('visually-hidden');
  item.offer.type
    ? addElement.querySelector('.popup__type').textContent = TYPE[item.offer.type]
    : addElement.querySelector('.popup__type').classList.add('visually-hidden');
  item.offer.rooms && item.offer.quests
    ? addElement.querySelector('.popup__text--capacity').textContent = `${item.offer.rooms} комнаты для ${item.offer.quests} гостей`
    : addElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  item.offer.checkin && item.offer.checkout
    ? addElement.querySelector('.popup__text--time').textContent = `Заезд после ${item.offer.checkin} выезд до ${item.offer.checkout}`
    : addElement.querySelector('.popup__text--time').classList.add('visually-hidden');
  item.offer.description
    ? addElement.querySelector('.popup__description').textContent = item.offer.description
    : addElement.querySelector('.popup__description').classList.add('visually-hidden');
  const popupFeatures = addElement.querySelector('.popup__features');
  const popupFeatureList = popupFeatures.querySelectorAll('.popup__feature');

  if (Array.isArray(item.offer.features)) {
    const modifiers = item.offer.features.map((featureValue) => `popup__feature--${featureValue}`);

    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeature.remove();
      }
    });
  } else {
    const modifiers = `popup__feature--${item.offer.features}`;
    popupFeatureList.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (modifiers !== modifier) {
        popupFeature.remove();
      }
    });
  }
  const popupPhotos = addElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if (Array.isArray(item.offer.photos)) {
    item.offer.photos.forEach((photoSrc, index) => {
      if (index === 0) {
        popupPhoto.src = item.offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotos.appendChild(popupPhotoItem);
      }
    });
  } else {
    popupPhoto.src = item.offer.photos;
  }
  addFragment.appendChild(addElement);
});
mapCanvas.appendChild(addFragment);
