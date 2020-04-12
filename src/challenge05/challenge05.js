let john = {
  bills: [124, 48, 268, 180, 42],
  tips: [],
  totals: [],
  billCalc: function() {
    this.bills.forEach(bill => {
      let tip;
      if (bill < 50) {
        tip = bill * 0.20;
      } else if (bill >= 50 && bill <= 200) {
        tip = bill * 0.15;
      } else {
        tip = bill * 0.10;
      }
      this.tips.push(tip);
      this.totals.push(bill + tip);
    })
  }
}

let mark = {
  bills: [77, 375, 110, 45],
  tips: [],
  totals: [],
  billCalc: function() {
    this.bills.forEach(bill => {
      let tip;
      if (bill < 100) {
        tip = bill * 0.20;
      } else if (bill >= 100 && bill <= 300) {
        tip = bill * 0.10;
      } else {
        tip = bill * 0.25;
      }
      this.tips.push(tip);
      this.totals.push(bill + tip);
    })
  }
}

const avgTips = function(tips) {
  let total = 0;
  tips.forEach(tip => {
    total += tip;
  })
  return total / tips.length;
}

john.billCalc();
mark.billCalc();
console.log('John bills: ', john.bills);
console.log('John tips: ', john.tips);
console.log('John totals: ', john.totals);
console.log('Mark bills: ', mark.bills);
console.log('Mark tips: ', mark.tips);
console.log('Mark totals: ', mark.totals);

let johnAvg = avgTips(john.tips);
let markAvg = avgTips(mark.tips);

if (johnAvg > markAvg) {
  alert('John family paid more on average: $' + johnAvg);
} else if (markAvg > johnAvg) {
  alert('Mark family paid more on average: $' + markAvg);
} else {
  alert('They paid the same in tips.')
}


