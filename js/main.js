//Функция возврата целого числа из заданного диапазлна(Включительно)
function getRandom(min, max) {
  if (max <= min){
    console.log('Введены не коректные значения')
  }
  return Math.floor(Math.random()*(max-min))+min;
}
getRandom(10,15)


// функция возврата заданного числа из диапазона

function getRandomFloat(min,max) {
  if(max <= min){
    console.log('Введены некорректные значения!')
  }
    return Math.random() * (max-min) + min;
}
getRandomFloat(10,12)
