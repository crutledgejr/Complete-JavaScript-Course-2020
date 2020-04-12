/* Lecture: Hoisting */

calculateAge(1965);

function calculateAge(year) {
  console.log(2016-year);
}

// Will not work since "retirement" is a function expression.
// Hoisting only works for function declarations.
//retirement(1980);

var retirement = function(year) {
  console.log(65 -(2016-year));
}

// variables
console.log(age);
var age = 23;
console.log(age);

function foo() {
  var age = 65;
  console.log(age);
}

foo();
console.log(age);

/* Lecture: Scoping */

var a = 'Hello';
first();

function first() {
  var b = 'Hi';
  second();

  function second() {
    var c = 'Hey';
    console.log(a + b + c);
    third();
  }
}

function third() {
  var d = 'John';
  //console.log(c);
  console.log(a + d);
}

/* Lecture: "this" */

/* NOTES
  Regular function call: the *this* keyword points at the global object ( the window object, in the browser).
  Method call: the *this* variable points to the object that is calling the method.
  Note: The *this* keyword is not assigned a value until a function where it is defined is actually called.
 */

//console.log(this);
currentAge(1976);
function currentAge(year) {
  console.log(2020 - year);
  console.log(this);
}

var john = {
  name: 'John',
  yearOfBirth: 1990,
  calcAge: function() {
    console.log(this);
    console.log(2020 - this.yearOfBirth);

    /*function innerFunction() {
      console.log(this);
    }
    innerFunction();*/
  }
};

john.calcAge();

var mike = {
  name: 'Mike',
  yearOfBirth: 1984
};

mike.calcAge = john.calcAge;
mike.calcAge();