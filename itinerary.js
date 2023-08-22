$(document).ready(function() {
  const storedInputValue = localStorage.getItem('budgetAmount'); //stored budget will be shown and displayed when user refresh page
  if(storedInputValue) {
    $('#budget-track').text('Budget:' + '$' + storedInputValue);
    
  }

  $('#save-budget-amount').on('click', function(event) { //user input budget amount and saved in local storage
   event.preventDefault();
   var newBudgetAmount = $('#budgetdollar-amount').val();
   $('#budget-track').text('Budget:' + '$' + storedInputValue) //the area or element to display the budget input
 
  localStorage.setItem('budgetAmount', newBudgetAmount);
  
  $('#edit-budget-modal').modal('hide');
  console.log(newBudgetAmount)
  });

  $('#save-expense-details').on('click', function(event){
    event.preventDefault();
    let selectedExpense = $('#expense-list-name').val();
    let noSelection = $('#select-result');
    let userInputAmount = $('#budget-dollar-amount').val();
    let noEnterAmount = $('#expense-amount-result');
    

    console.log(selectedExpense); 
    console.log(userInputAmount);
   
    if (selectedExpense === "") {
      noSelection.show();
    } else {
      noSelection.hide(); 
    }

    if (userInputAmount === "") {
      noEnterAmount.show();
    } else {
      noSelection.hide();
      noEnterAmount.hide();
      
    }

    if (selectedExpense !== "" && userInputAmount !== "") {
      localStorage.setItem('selectedExpense', selectedExpense);
      localStorage.setItem('userInputAmount', userInputAmount);
     
      let totalExpenses = 0;
      const expenseContainer = $('#add-expense-js');
      for (let i = 0; i < 1; i++) {
        const progressBarWidth = (totalExpenses + parseFloat(userInputAmount));
        $('#progress-bar').css('width', progressBarWidth + '%');
        $('#total-expenses').text('$' + progressBarWidth.toFixed(2));
        localStorage.setItem('totalExpenses', progressBarWidth)
          
        const newExpenseDiv = $('<h6>', {
          class: 'expense-item',
          text: 'Expense ' + (i + 1) + ': ' + selectedExpense + ' - $' + userInputAmount
          
        });
        
        expenseContainer.append(newExpenseDiv);
      }
       $('#add-expense-details').modal('hide');
    }
  });
});
    
  var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
     
    this.classList.toggle("active");

    
    var panel = this.nextElementSibling; //next sibling is the p-tag, which will hold the expense list
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

function copyText() {
      
  // Copy text into clipboard 
  //copy invite link 
  navigator.clipboard.writeText
      ("https://github.com/Saragar710/Travel-Itinerary");
};