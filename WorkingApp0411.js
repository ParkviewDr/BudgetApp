

//budget controller
var budgetController = (function(){
	
	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		
	};
	
		var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		
	};
	
var data = {
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
				addItem: function(type, des, val) {
					
					var newItem, ID;
					
				//Create new ID
					
					if (data.allItems[type].length > 0) {
						ID = data.allItems[type][data.allItems[type].length -1].id + 1;
					} else {
						ID = 0;
					}
					
					// create new item based on 'inc' or 'exp' type
					if (type === 'exp') {
						
							newItem = new Expense(ID, des, val);
						
					} else if (type === 'inc') {
						
								newItem = new Income(ID, des, val);
						
					}
					// push the new item into the allItems array 
				data.allItems[type].push(newItem);
					
					// return the element 
					return newItem;
					
				},
		
		testing: function(){
			console.log(data);
		}
	};
	
})();


/*setting up modules that are created by using an IMMEDIATELY INVOKED FUNCTION AND A CLOSURE
THIS CREATES data privacy and it how modules are created 
modules are useful so we can
 separate chunks of code into smaller versions  */

//ui controller 
var UIController = (function(){
	
	
	var domStrings = {
		
		inputType: '.add__type',
		addDescription: '.add__description',
		addValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list'
		
		
	};
	
	return {
		getinput: function() {
			return {
								type: document.querySelector(domStrings.inputType).value, // will be either inc or exp
						 description: document.querySelector(domStrings.addDescription).value,
								value: document.querySelector(domStrings.addValue).value
			};
		},
		
     addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = domStrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = domStrings.expenseContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
		getDomStrings: function () {
			return domStrings;
		}
	};

})();
/*
	the budgetCtrl is defined as
 BudgetController down at the end of the module
this allows the code to more modular	
Global app Controller

*/
	
	var controller = (function(budgetCtrl, UICtrl){
		
		var setupEventListeners = function() {
			
			var DOM = UICtrl.getDomStrings();
			
			
	document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		
			document.addEventListener('keypress', function(event) {
				if (event.keyCode === 13 || event.which === 13) {
					
		 ctrlAddItem();
					
					
				}
			
			
		});
			
		}
		
		var ctrlAddItem = function() {
			var input, newItem;
			
			// get the filed input data
		input = UICtrl.getinput();
		
		
		// add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		// add the item to the UI
			UICtrl.addListItem(newItem, input.type);
		
		//calculate the budget
		
		
		//display the budget on the UI
		
			
			
		};
		
		return {
			
			init: function(){
				console.log('the program has started')
				setupEventListeners();
			}
		};
	

	
})(budgetController, UIController);


controller.init();
