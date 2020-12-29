/* LECTURE: MAPS IN ES6 */
/* NOTES
  1) Why maps over objects?
    a) We can use anything as keys.
    b) They are iterable.
    c) Easy to get the size of a map using 'size' property.
    d) Can easily add and remove items from them.
 */

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer!');
question.set(false, 'Incorrect. Try again.');

console.log(question.get('question'));
//console.log(question.size);

/*if (question.has(4)) {
  console.log(`We see a '4' key. It is: ${question.get(4)}`);
}*/
// you can clear the map of all values
//question.clear();

// Note: Maps are iterable!
/*question.forEach((value, key) => {
  console.log(`Key: ${key}; Value: ${value}`);
});*/

for (let [key, value] of question.entries()) {
  if (typeof(key) === 'number') {
    console.log(`${key} - ${value}`);
  }
}

const ans = parseInt( prompt('Select the number of your answer.'));
console.log(`You selected: ${ans}`);
const result = (question.get('correct') === ans);
console.log(question.get(result));
