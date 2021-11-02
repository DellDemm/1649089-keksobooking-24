const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapFeatures = form.children;
const interactiveMapFilters = mapFilters.children;
const disableForm = 'ad-form--disabled';

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
