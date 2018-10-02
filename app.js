let budgetController = (function(){
    
    //Some code

})();


let UIController = (function(){

    //some code

})();


let controller = (function(budgetCtrl, UICtrl){

    let ctrlAddItem = function(){
        // 1. Get input data
        // 2. Add into the budget controller
        // 3. Add into the UI
        // 4. Calculate the budget 
        // 5. Dislay budget on the UI
        console.log('It\'s working fine');
    }    

   document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

   document.addEventListener('keypress', function(){

        if(event.key == 'Enter'){
            ctrlAddItem();
            console.log(event);
        }
   });

})(budgetController, UIController);