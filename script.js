let arr = [];
let zoo = [];
let arrFood = ['Яблоко', 'Перец', 'Труп осла', 'Конфета', 'Уран', 'Tорт'];

const button = document.querySelector('.button');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const container = document.querySelector('.container');
const alertF = document.querySelector('.alert');

class Hamster {
   constructor() {
      this.y = '515px';
      this.x = Math.floor(Math.random() * 905 + 5) + 'px';
      this.food = 'Nothing';
      this.first = false;
      let r = Math.floor(Math.random() * (256));
      let g = Math.floor(Math.random() * (256));
      let b = Math.floor(Math.random() * (256));
      this.back = '#' + r.toString(16) + g.toString(16) + b.toString(16);
   }
}

let a = 1;
const butF = () => {
   zoo.push(new Hamster);
   container.insertAdjacentHTML('beforeend', `<div class='hamster'>${a}<div class='mouth'></div></div>`);
   a++;
   arr = document.querySelectorAll('.hamster');
   arr.forEach((el, i) => {
      el.style.top = zoo[i].y;
      el.style.left = zoo[i].x;
      el.style.background = zoo[i].back;
   });
   start.addEventListener('click', starting);
}
button.addEventListener('click', butF);


const starting = () => {
   const stopping = () => {
      clearInterval(reverseFalling);
      stop.removeEventListener('click', stopping);
      button.removeEventListener('click', butF);
      start.addEventListener('click', starting);
   }
   stop.addEventListener('click', stopping);
   start.removeEventListener('click', starting);
   button.removeEventListener('click', butF);
   let reverseFalling = setInterval(() => {
      arr.forEach((el, i) => {
         let currentY = +window.getComputedStyle(el).top.slice(0, -2);
         currentY -= Math.floor(Math.random() * 20);
         el.style.top = currentY + 'px';
         if(currentY <= 2){
            currentY = 2;
            clearInterval(reverseFalling);
            start.removeEventListener('click', starting);
            stop.removeEventListener('click', stopping);
            button.removeEventListener('click', butF);
            zoo[i].first = true;
            let f = arrFood[Math.floor(Math.random() * arrFood.length)];
            zoo[i].food = f;
            console.log(zoo[i].food)
            alertF.style.display = 'flex';
            alertF.innerText = `Победил хомячок под номером ${i + 1}! И он получает специальный приз: ${f}!`;
            zoo.forEach((el, i) => {
               if(el.first == false)arr[i].style.display = 'none';
            });
            const qaz = () => {
               let yn = prompt(`Вы хотите поздравить хомячка ${i + 1}? y/n`);
               if(yn == null){
                  alert(`Хомячок №${i + 1} обиделся на Вас, Евгений Олегович!`);
               }
               else if(yn == 'y'){
                  alert(`Хомячок №${i + 1} благодарит Вас, Евгений Олегович!`);
               }
               else if(yn == 'n'){
                  alert(`Хомячок №${i + 1} обиделся на Вас, Евгений Олегович!`);
               }
               else{
                  alert(`Написано же - y/n`);
                  setTimeout(qaz, 100);
               }
            }
            setTimeout(qaz, 300);
         }
      });
   }, 30);
}
