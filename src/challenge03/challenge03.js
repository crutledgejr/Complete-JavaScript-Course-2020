const bills = [124, 48, 268];
var tips = [];
var totals = [];

const calculateTip = function(amount) {
  if (amount < 50) {
    return 0.2 * amount;
  } else if (amount >= 50 && amount <= 200) {
    return 0.15 * amount;
  } else if (amount > 200) {
    return 0.10 * amount;
  } else {
    return 0;
  }
}

bills.forEach(amount => {
  let tip = calculateTip(amount);
  tips.push(tip);
  totals.push(amount + tip);
})

console.log('bills: ', bills);
console.log('tips: ', tips);
console.log('totals: ', totals);