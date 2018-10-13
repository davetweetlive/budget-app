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

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
        testing: function(){
            console.log(data);
        }
    };

})();


let UIController = (function(){
    // DOM defination with classes and ids
    let DOMstrings = {
        inputType:          '.add__type',
        inputDescription:   '.add__description',
        inputValue:         '.add__value',
        inputBtn:           '.add__btn',
        incomeContainer:    '.income__list',
        expenseContainer:   '.expenses__list'
    }
    
    
    return{
        // getInput object function function gets input from input fields type, description and value
        getInput: function(){
            return {
                type        : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value       : document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type){
            let html, newHtml, element;
            //Create HTML Strings with place holder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%discription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            
            }else if(type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%discription%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace the placeholded text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%discription%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //Insert html into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

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

    };
    

    let ctrlAddItem = function(){
        // 1. Get input from the input field
        let input = UICtrl.getInput();
        
        // 2. Add the items to the budget controller
        let newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the items to the UI
        UICtrl.addListItem(newItem, input.type);
        
        // 4. Clear the fields
        UICtrl.clearFields();
        
        // 5. Calculate the budget

        // 6. Display the budget on the UI
        
        console.log('Working')
    }
    
    return {
        init: function(){
            console.log('Application has started!');
            setupEventListeners();
        }
    };
})(budgetController, UIController)


controller.init();