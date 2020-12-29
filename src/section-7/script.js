// Lecture: let and const

// ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';
// console.log('name5=' + name5);

// ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller';
// console.log('name6='+ name6);

// ES5
function driversLicense5(passedTest) {
  if (passedTest) {
    var firstName = 'John';
    var yearOfBirth = 1990;
  }
  console.log('[es5]: name=' + firstName + '; born=' + yearOfBirth + '; can now drive' );
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest) {
  let firstName;
  const yearOfBirth = 1990;
  if (passedTest) {
    firstName = 'John';
  }
  console.log('[es6]: name=' + firstName + '; born=' + yearOfBirth + '; can now drive' );
}

driversLicense6(true);
