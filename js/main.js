//Функция возврата целого числа из заданного диапазлна(Включительно)
function getRandom(min, max) {
  if (max <= min){
    throw('Введены не коректные значения');
  }
  return Math.floor(Math.random()*(max-min))+min;
}
getRandom(10,15);


// функция возврата заданного числа из диапазона

const getRandomIntFromToWithComma = (from, to, countSignsAfterComma) => {
  if (from < 0 || to <= from) {
    throw('Введены не коректные значения');
  }
  return +(Math.random() * (to - from)).toFixed(countSignsAfterComma) + from;
};

getRandomIntFromToWithComma(0.4, 4.9, 3);
