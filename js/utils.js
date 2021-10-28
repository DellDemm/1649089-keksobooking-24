//Функция возврата целого числа из заданного диапазлна(Включительно)
function getRandom(min, max) {
  if (max <= min){
    throw('Введены не коректные значения');
  }
  return Math.floor(Math.random()*(max-min))+min;
}
export {getRandom};
// функция возврата заданного числа из диапазона
const getRandomIntFromToWithComma = (from, to, countSignsAfterComma) => {
  if (from < 0 || to <= from) {
    throw('Введены не коректные значения');
  }
  return +(Math.random() * (to - from)).toFixed(countSignsAfterComma) + from;
};
export {getRandomIntFromToWithComma};
