let budgetController = (function(){
    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let calculateTotal = function(type){
        let sum = 0;

        data.allItems[type].forEach(function(cur){
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
    }

    return {
        addItem: function(type, des, val){
            let newItem, ID;
            
            //Create new Id
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0;
            }
            

            //Create new item based on inc or exp type
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            }else if(type === 'inc'){
                newItem = new Income(ID,des,val);
            }

            //Push it into datastructure and finally return
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id){
            let ids = data.allItems[type].map(function(current){
                return current.id;
            });

            let index =  ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){

            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the persentage of the income spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
            
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function(){
            console.log(data);
        }
    };

})();


/*
The UIController immidiately invoked function that controlls all the user interface related activities that includes declaring classes
of html elements as DOMstring in an object get values from input fields, add html tags to display incomes and expenses list
*/
let UIController = (function(){
    // DOM defination with classes and ids
    let DOMstrings = {
        inputType:          '.add__type',
        inputDescription:   '.add__description',
        inputValue:         '.add__value',
        inputBtn:           '.add__btn',
        incomeContainer:    '.income__list',
        expenseContainer:   '.expenses__list',
        budgetLable:        '.budget__value',
        incomeLable:        '.budget__income--value',
        expenseLable:       '.budget__expenses--value',
        percentageLable:    '.budget__expenses--percentage',
        container:          '.container'
    }
    
    
    return{
        // getInput object function function gets input from input fields type, description and value
        getInput: function(){
            return {
                type        : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value       : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            let html, newHtml, element;
            //Create HTML Strings with place holder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%discription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            }else if(type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%discription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace the placeholded text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%discription%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        //Deleting list items after remove button clicked
        deleteListItem: function(selectorId){
            let ele = document.getElementById(selectorId);
            ele.parentNode.removeChild(ele);
        },

        //Clearing fields after adding elements to the UI
        clearFields: function(){
            let fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription +', '+ DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = '';
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLable).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLable).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLable).textContent = obj.totalExp;
            
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLable).textContent = obj.percentage +'%';
            }else{
                document.querySelector(DOMstrings.percentageLable).textContent = '--';
            }

        },

        // The oobject function getDOMstrings returns DOMstrings object to the other function since it's private to UIControlor
        getDOMstrings: function(){
            return DOMstrings;
        }
    }
})();


/* 
controller works as a global controller and it's an immidiately invoked function controlls events such as
button click, enter key press and 
*/
let controller = (function(budgetCtrl, UICtrl){

    let setupEventListeners = function(){
        let DOM = UICtrl.getDOMstrings();
        
        //Click button on the html and the following event happens
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        
        //Pess Enter key and the following event will occour
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', CtrlDeleteItem)

    };
    
    let updateBudget = function(){

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Returns the budget
        let budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);

    };

    let ctrlAddItem = function(){
        // 1. Get input from the input field
        let input = UICtrl.getInput();
        
        if(input.description !== '' && !isNaN(input.value) && input.value > 0){

            // 2. Add the items to the budget controller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the items to the UI
            UICtrl.addListItem(newItem, input.type);
            
            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
            
        }
        
        console.log('Working')
    };

    let CtrlDeleteItem = function(e){
        let itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemId){
            splitId = itemId.split('-');
            type = splitId[0];
            ID = parseInt(splitId[1]);

            // delete the item from the data sturcture
            budgetCtrl.deleteItem(type, ID)

            // delete the item from the UI
            UICtrl.deleteListItem(itemId);

            // update the updated budget
            updateBudget();
        }
    }
    
    return {
        init: function(){
            console.log('Application has started!');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    };
})(budgetController, UIController)


controller.init();