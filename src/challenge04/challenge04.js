var john = {
  name: 'John Smith',
  mass: 150,
  height: 2.1,
  calcBMI: function() {
    this.BMI = this.mass / (this.height * this.height);
    return this.BMI;
  }
}

var mark = {
  name: 'Mark Mabry',
  mass: 70,
  height: 1.75,
  calcBMI: function() {
    this.BMI = this.mass / (this.height * this.height);
    return this.BMI;
  }
}

console.log('John initial object: ', john);
console.log('Mark initial object: ', mark);
const johnBMI = john.calcBMI();
const markBMI = mark.calcBMI();
const diff = johnBMI - markBMI;
console.log('John final object: ', john);
console.log('Mark final object: ', mark);

const alertMessage = diff === 0 ? john.name + 'and ' + mark.name + ' have the same BMI: ' + john.BMI + '.'
  : (
    diff < 0 ? mark.name + ' has the higher BMI: ' + mark.BMI + '.'
      : john.name + ' has the higher BMI: ' + john.BMI + '.'
  );

alert(alertMessage);