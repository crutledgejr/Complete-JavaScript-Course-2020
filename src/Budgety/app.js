// Budget Controller (Data)
var budgetController = (function() {

})();

// UI Controller
var UIController = ( function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // either 'inc' or 'exp'
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    };
})();

// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMStrings();

    var ctrlAddItem = function() {
        // 1. GEt the field input data.
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller

        // 3. add the item to the ui

        // 4. calculate the budget

        // 5. display the budget on the ui
    }
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);