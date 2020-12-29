// LECTURE: STRINGS

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
  return 2020 - year;
}

// ES5
console.log('[es5]: This is ' + firstName + ' ' + lastName +
  '. ' + 'He was born in ' + yearOfBirth + '. ' +
  'Today he is ' + calcAge(yearOfBirth) + ' years old.'
);

// ES6
console.log(`[es6]: This is ${firstName} ${lastName}. \
He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes('v'));
console.log(`${firstName} `.repeat(5));
