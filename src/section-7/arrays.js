/* LECTURE: ARRAYS IN ES6 */

// EXERCISE 1 - Change box color - convert nodelist to array
const boxes = document.querySelectorAll('.box');

// ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
});

// ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
});

// EXERCISE 2 - BREAK LOOP

// ES5
/*for (var i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === 'box blue') {
    //continue;
    break;
  }

  boxesArr5[i].textContent = 'I changed to blue!';
}*/

// ES6
for (const box of boxesArr6) {
  if (box.className.includes('blue')) {
    //continue;
    break;
  }

  box.textContent = 'I changed to blue!';
}

// EXERCISE 3: ARRAY CONVENIENCE METHODS

// ES6
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(cur) {
  return cur >= 18;
})
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
console.log (ages.findIndex(cur => cur >= 18));
console.log (ages.find(cur => cur >= 12));
const allAges = ages.filter(age => age >= 12);
console.log(`ALL AGES: `, allAges);
