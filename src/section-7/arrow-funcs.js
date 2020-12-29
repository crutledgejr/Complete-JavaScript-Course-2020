/* LECTURE: ARROW FUNCTIONS */

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (el) {
  return 2020 - el;
});
console.log(`[es5]: \n${ages5}`);

// ES6
let ages6 = years.map(el => 2020 - el);
console.log(`[es6]: \n${ages6}`);

ages6 = years.map((el, index) => `[${index}]: ${2020 - el}`);
console.log(`[es6]: Updated ages6!\n${ages6}`);

/* LECTURE: ARROW FUNCTIONS & LEXICAL 'THIS' */

// ES5
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    var self = this;
    document.querySelector('.green').addEventListener(
      'click', function() {
        var str = 'This is box #' + self.position + ' and it is ' +
          self.color;
        alert(str);
      }
    )
  }
};
//box5.clickMe();

// ES6
const box6 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener(
      'click', () => {
        var str = 'This is box #' + this.position + ' and it is ' +
          this.color;
        alert(str);
      }
    )
  }
};
//box6.clickMe();

// ES6 PT 2
/*
const box66 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener(
      'click', () => {
        var str = 'This is box #' + this.position + ' and it is ' +
          this.color;
        alert(str);
      }
    )
  }
};
box66.clickMe();*/


function Person(name) {
  this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(el) {
    return this.name + ' is friends with ' + el;
  }.bind(this));
  console.log(arr);
};

var friends = ['Bob', 'Jane', 'Mark'];
//new Person('John').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function(friends) {
  const arr = friends.map((el) => `${this.name} is friends with  + ${el}`);
  console.log(arr);
};

new Person('Mike').myFriends6(friends);
