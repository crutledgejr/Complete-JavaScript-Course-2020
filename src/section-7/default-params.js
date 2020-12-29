/* LECTURE: DEFAULT PARAMETERS */
/* Note: how to give function params a default value */

// ES5
/*
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
  lastName === undefined ? lastName = 'Smith' : lastName;
  nationality === undefined ? nationality = 'American' : nationality;

  this.firstName = firstName;
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
*/

// ES6
function SmithPerson(
  firstName,
  yearOfBirth,
  lastName = 'Smith',
  nationality = 'American'
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

let john = new SmithPerson('John', 1990);
let emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
