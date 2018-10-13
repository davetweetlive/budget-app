let budgetController = (function(){

  let Expense = function(id, description, value){
    this.id          = id;
    this.description = description;
    this.value       = value;
  };
  let Income  = function(id, description, value){
    this.id          = id;
    this.description = description;
    this.value       = value;
  };
  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  return {
    addItem: function(type, des, val){
      ID = 0;
      if(type === 'exp'){
        let newItem = new Expense(ID, des, val);
      }else{
        let newItem = new Expense(ID, des, val);
      }
    }
  }
})();





let UIController = (function(){

  let DOMStrings = {
    inputType: '.add__type',
    inputDesc: '.add__description',
    inputAmmount: '.add__value',
    inputButton: '.add__btn'
  }
  return {
    getInput: function(){
      return {
        type:           document.querySelector(DOMStrings.inputType).value,
        description:    document.querySelector(DOMStrings.inputDesc).value,
        ammount:        document.querySelector(DOMStrings.inputAmmount).value
      };
    },
    getDOMStrings: function(){
      return DOMStrings;
    }
  };

})();


let controller = (function(budgetCtrl, UICtrl){

  let setUpEventListeners = function(){
    let DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(){
      if(event.key == 'Enter'){
        ctrlAddItem();
      }
    });

  }
  let ctrlAddItem = function(){

    // 1. Get input data from UICtrl as dictionary
    let inputData = UICtrl.getInput();
    console.log(inputData);

    // 2. Add into the budget controller
    // 3. Add into the UI
    // 4. Calculate the budget
    // 5. Dislay budget on the UI

  }
  return {
    init: function(){
      console.log('Application has Started!');
      setUpEventListeners();
    }
  }


})(budgetController, UIController);

controller.init();
