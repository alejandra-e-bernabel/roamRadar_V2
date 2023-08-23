// Get elements
const addExpenseButton = document.getElementById('addExpenseButton');
const expenseModal = document.getElementById('expenseModal');
const closeModal = document.getElementsByClassName('close')[0];
const saveExpenseButton = document.getElementById('saveExpenseButton');
const expenseList = document.getElementById('expenseList');
const budgetAmountInput = document.getElementById('budgetAmount');
const bar = document.getElementById('bar');
const numericTracker = document.getElementById('numericTracker');
const visualTracker = document.getElementById('visualTracker');

// Check if budget amount exists in local storage
let budgetAmount = localStorage.getItem('budgetAmount');
if (budgetAmount) {
    budgetAmountInput.value = budgetAmount;
    let setAmount = parseFloat(budgetAmount).toFixed(2);
    console.log("setAmount is "+ setAmount + "\nbudgetAmoutn is " + budgetAmount);

    document.getElementById("currBudgetText").innerHTML = "Current budget: $" + setAmount;
    // document.getElementById("currBudgetText").innerHTML = "Current budget: $" + budgetAmount; 
}

// Check if expenses exist in local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add event listeners
addExpenseButton.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);
saveExpenseButton.addEventListener('click', saveExpense);
budgetAmountInput.addEventListener('change', updateBudget);

// Functions
function openModal() {
    expenseModal.style.display = 'block';
}

function closeModalHandler() {
    expenseModal.style.display = 'none';
}

function saveExpense() {
    const expenseType = document.getElementById('expenseType').value;
    const expenseAmount = document.getElementById('expenseAmount').value;

    const expense = {
        type: expenseType,
        amount: expenseAmount
    };

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    closeModalHandler();
    populateExpenses();
    updateProgressBar();
    updateNumericTracker();
}

// function updateBudget() {
//     budgetAmount = budgetAmountInput.value;
//     localStorage.setItem('budgetAmount', budgetAmount);
//     updateProgressBar();
// }

// function populateExpenses() {
//     expenseList.innerHTML = '';

//     for (let i = 0; i <expenses.length; i++) {
//         const expense = expenses[i];

//         const expenseItem = document.createElement('div');
//         expenseItem.classList.add('expense-item');
//         expenseItem.innerHTML = "<div>Type: " + expense.type + "</div><div>Amount: $"+ expense.amount + "</div>";

//         expenseList.appendChild(expenseItem);
//     }
// }

function updateBudget() {
    budgetAmount = budgetAmountInput.value;
    localStorage.setItem('budgetAmount', budgetAmount);
    updateProgressBar();

    if (budgetAmount < 0) {
        document.getElementById("currBudgetText").innerHTML = "Budget has not been set"; 
    } else {
        let setAmount = parseFloat(budgetAmount).toFixed(2);

        console.log("setAmount is "+ setAmount + "budgetAmoutn is " + budgetAmount);

        document.getElementById("currBudgetText").innerHTML = "Current budget: $" + setAmount; 
    }
}

function populateExpenses() {
    expenseList.innerHTML = '';

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        const expenseItem = document.createElement('div');
        // expenseItem.classList.add('expense-item');
        

        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add("expenseItem");

        let writtenAmount = parseFloat(expense.amount).toFixed(2);
        expenseInfo.innerHTML = "<div class= expenseInfo><div class= budgetType><span class= type>Type: </span>" + expense.type + "</div><div class= budgetAmount><span class= type>Amount:</span> $" + writtenAmount + "</div></div>";
        expenseItem.appendChild(expenseInfo);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<b>Delete expense</b>';
        deleteButton.classList.add("btn");
        deleteButton.classList.add("btn-warning");
        // deleteButton.classList.add("deleteButton");

        deleteButton.addEventListener('click', function() {
            deleteExpense(i);
            updateProgressBar();
            updateNumericTracker();
        });
        expenseInfo.appendChild(deleteButton);

        expenseList.appendChild(expenseItem);
    }
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    populateExpenses();
}

function updateProgressBar() {
    const filledPercentage = (expenses.reduce((total, expense) => total + parseInt(expense.amount), 0) / parseFloat(budgetAmount).toFixed(2)) * 100;
    const progressBarWidth = Math.min((filledPercentage * 5), 500); // Limiting width to maximum 200px
    bar.style.width = progressBarWidth + 'px';

    if (filledPercentage >= 100) {
        bar.style.backgroundColor = '#C51F3B';
    } else {
        bar.style.backgroundColor = '#31D2F2';
    }
}

function updateNumericTracker() {
    const spentAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    numericTracker.innerHTML = "<b>Total spent:</b> $" + spentAmount.toFixed(2);

    if (spentAmount >= parseFloat(budgetAmount).toFixed(2)) {
        numericTracker.style.color = 'red';
    } else {
        numericTracker.style.color = 'black';
    }
}

// Get the clear budget button element
const clearBudgetButton = document.getElementById('clearBudgetButton');

// Add event listener for clear budget button click 

clearBudgetButton.addEventListener('click', clearBudget);

// Function to clear the budget 
function clearBudget() {
    localStorage.removeItem('budgetAmount');
    localStorage.removeItem('expenses'); 
    budgetAmountInput.value = ''; 
    document.getElementById("currBudgetText").innerHTML = "Current budget: $0"; 

    
    expenses = []; 
    
    populateExpenses(); 
    updateProgressBar(); 
    updateNumericTracker(); 
}



function openPopup() {
    document.getElementById("popup").style.display = "block";
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }

  function toggleExpenses() {
    var expenseList = document.getElementById("expenseList");
    if (expenseList.style.display === "none") {
        
        expenseList.style.display = "flex";
    } else {
        expenseList.style.display = "none";
    }
}

// Initial population
populateExpenses();
updateProgressBar();
updateNumericTracker();


