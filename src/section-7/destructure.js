/* LECTURE: DESTRUCTURING */

// ES5
var john = ['John', 26];
// var name = john[0];
// var age = john[1];

// ES6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
  firstName: 'John',
  lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(`[1st]: ${firstName}`);
console.log(`[1st]: ${lastName}`);

const {firstName: a, lastName: b} = obj;
console.log(`[2nd]: ${a}`);
console.log(`[2nd]: ${b}`);

// ES6 - Function exercise
function calcAgeRetire(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65-age];
}

const [age2, retirement] = calcAgeRetire(1990);
console.log(`[3rd]: ${age2}`);
console.log(`[3rd]: ${retirement}`);
