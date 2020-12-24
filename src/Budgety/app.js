// Budget Controller (Data)
let budgetController = (function() {

  let Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  }

  let Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let calculateTotal = function(type) {
    let sum = 0;
    data.allItems[type].forEach(cur => {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, desc, val) {
      let newItem, ID;
      // Create new id
      ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 1;
      // Create new item based on 'inc' or 'exp'
      if (type === 'exp') {
          newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
          newItem = new Income(ID, desc, val);
      }
      // Push new data into data structure
      data.allItems[type].push(newItem);
      // Return new item
      return newItem;
    },

    deleteItem: function(type, id) {
      let ids = data.allItems[type].map((curr) => {
        return curr.id;
      });
      let index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percentage of income represented by expenses
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: () => {
      data.allItems.exp.forEach((expense) => {
        expense.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: () => {
      return data.allItems.exp.map((expense) => {
        return expense.getPercentage();
      });
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function() {
        console.log(data);
    }
  };

})();

// UI Controller
let UIController = ( function() {
  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };

  let formatNumber = function(number, type) {
    /*
    + or - before the number
    exactly 2 decimal places
    comma separation on thousands
     */

    let num = Math.abs(number);
    let formattedString = num.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    return (
      type === 'inc'
        ? `+ ${formattedString}`
        : (type === 'exp' ? `- ${formattedString}` : '')
    );
  };

  let nodeListForEach = function(list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMStrings.inputType).value, // either 'inc' or 'exp'
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },

    addListItem: function(obj, type) {
      // Create HTML string with placeholder text
      let html, newHtml, element;
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"> ' +
          '<div class="item__description">%description%</div> ' +
          '<div class="right clearfix"> ' +
          '<div class="item__value">%value%</div> ' +
          '<div class="item__delete"> ' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> ' +
          '</div> ' +
          '</div> ' +
          '</div>';
      } else if (type === 'exp') {
        element = DOMStrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%">' +
          '<div class="item__description">%description%</div>' +
          '<div class="right clearfix">' +
          '<div class="item__value">%value%</div>' +
          '<div class="item__percentage">21%</div>' +
          '<div class="item__delete">' +
          '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
          '</div>' +
          '</div>' +
          '</div>'
      }

      // Replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value,type));

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    deleteListItem: function(selectorId) {

      let el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);

    },

    clearFields: function() {
      let fields, fieldsArray;
      fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);

      fieldsArray = Array.prototype.slice.call(fields);
      fieldsArray.forEach(field => {
        field.value = '';
      });

      fieldsArray[0].focus();
    },

    displayBudget: function(obj) {
      let type;
      obj.budget > 0 ? type = 'inc' : type = 'exp';

      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget,type);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
      if(obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }
    },

    displayPercentages: function(percentages) {
      let fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

      nodeListForEach(fields, (current, index) => {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });
    },

    displayMonth: function() {
      let now, year, month, months;
      now = new Date();
      months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      year = now.getFullYear();
      month = now.getMonth();
      document.querySelector(DOMStrings.dateLabel).textContent = months[month-1] + ' ' + year;
    },

    changedType: function() {
      let fields = document.querySelectorAll(
        DOMStrings.inputType + ',' +
        DOMStrings.inputDescription + ',' +
        DOMStrings.inputValue);

      nodeListForEach(fields, function(cur) {
        cur.classList.toggle('red-focus');
      });

      document.querySelector(DOMStrings.inputButton).classList.toggle('red');
    },

    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();

// Global App Controller
let controller = (function (budgetCtrl, UICtrl) {

  let setupEventListeners = function() {
    let DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
  };

  let updateBudget = function() {
    // 1. Calc the budget
    budgetCtrl.calculateBudget();

    // 2. return the budget
    let budget = budgetCtrl.getBudget();

    // 3. Display budget in ui
    UICtrl.displayBudget(budget);
  }

  let updatePercentages = () => {
    // 1. calc %s
    budgetCtrl.calculatePercentages();

    // 2. read %s from budget controller
    let percentages = budgetCtrl.getPercentages();

    // 3. update UI with new %s
    UICtrl.displayPercentages(percentages);
  }

  let ctrlAddItem = function() {
    // 1. Get the field input data.
    let input, newItem;
    input = UICtrl.getInput();

    if ( input.description !== '' && !isNaN(input.value) && input.value > 0 ) {

      // Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // add the item to the ui & clear input fields
      UICtrl.addListItem(newItem, input.type);
      UICtrl.clearFields();

      // calculate and update the budget
      updateBudget();

      // update percentages
      updatePercentages();
    }
  };

  let ctrlDeleteItem = function(event) {
    let itemId, splitId, type, id;
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemId) {
      splitId = itemId.split('-');
      type = splitId[0];
      id = parseInt(splitId[1]);

      // 1. delete the item from data structure
      budgetCtrl.deleteItem(type, id);

      // 2. delete the item from UI
      UICtrl.deleteListItem(itemId);

      // 3. Update the UI with new budget
      updateBudget();
    }
  };

  return {
    init: function() {
      console.log('Budgety application has started.');
      UICtrl.displayMonth();
      setupEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      });
    }
  }

})(budgetController, UIController);

controller.init();
