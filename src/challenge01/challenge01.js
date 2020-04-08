const markMass = prompt('Enter Mark\'s mass (lbs).');
const markHeight = prompt('Enter Mark\'s height (cm).');
const johnMass = prompt('Enter John\'s mass (lbs).');
const johnHeight = prompt('Enter John\'s height (cm).');

const markBMI = markMass / (markHeight * markHeight);
const johnBMI = johnMass / (johnHeight * johnHeight);

const diff = markBMI > johnBMI ? 'higher' : 'lower';

console.log('Mark\'s BMI is ' + diff + ' than John\'s BMI.')
alert('Mark\'s BMI is ' + diff + ' than John\'s BMI.');