/* LECTURE: REST PARAMETERS */

// ES5
/*function isFullAge5() {
  console.log(arguments);
  var argsArr = Array.prototype.slice.call(arguments);
  argsArr.forEach(function(year) {
    console.log( (2020 - year) >= 18);
  });
}

isFullAge5(1990, 1999, 1965);
isFullAge5(1990, 1999, 1965, 2016, 1987);

// ES6
function isFullAge6(...years) {
  years.forEach(function(year) {
    console.log( (2020 - year) >= 18);
  });
}

isFullAge6(1990, 1999, 1965);
isFullAge6(1990, 1999, 1965, 2016, 1987);*/

// EXERCISE: TAKING REST PARAMS FURTHER
// ES5
function isFullAge5(limit) {
  var argsArr = Array.prototype.slice.call(arguments, 1);
  argsArr.forEach(function(year) {
    console.log('es5: ', (2020 - year) >= limit);
  });
}

isFullAge5(30, 1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);

// ES6
function isFullAge6(limit, ...years) {
  years.forEach(function(year) {
    console.log( `es6: ${(2020 - year) >= limit}`);
  });
}

isFullAge6(30, 1990, 1999, 1965);
isFullAge6(30, 1990, 1999, 1965, 2016, 1987);

