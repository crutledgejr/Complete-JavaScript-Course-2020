/* LECTURE: CLASSES */
/* NOTES - This lecture also covers subclasses; see below
  1) Adds nothing new
  2) Makes it easier to implement inheritance.
 */

// ES5
var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
};

// LESSON: SUBCLASS FOR ES5
var Athlete5 = function(
  name,
  yearOfBirth,
  job,
  olympicGames,
  medals
) {
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function() {
  this.medals++;
  console.log(this.name + ' won a medal!');
}

var john5 = new Person5('John', 1990, 'teacher');
var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

// ES6
// Note: no semicolons on constructor and function defs in class below.
// Note: You can use static functions; see "greeting" function below.
// Note: Class definitions are not hoisted; must implement and use later.
// Note: Can only add methods to classes, not properties.
  // This is fine. It's not good practice to inherit properties in instances.
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }

  /*static greeting() {
    console.log(`Person6 Greeting: Hello!`);
  }*/
}

// LESSON: SUBCLASS
class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }

  wonMedal() {
    this.medals++;
    console.log(`${this.name} won an Olympic medal!`);
  }
}

const john6 = new Person6('Mike', 2000, 'Influencer');
const johnAthlete6 = new Athlete6('Mike', 1995, '400m sprinter', 4, 4);
johnAthlete6.wonMedal();
//Person6.greeting();
