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

function updateBudget() {
    budgetAmount = budgetAmountInput.value;
    localStorage.setItem('budgetAmount', budgetAmount);
    updateProgressBar();
}

function populateExpenses() {
    expenseList.innerHTML = '';

    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = "<div>Type: " + expense.type + "</div><div>Amount: "+ expense.amount + "</div>";

        expenseList.appendChild(expenseItem);
    }
}

function updateProgressBar() {
    const filledPercentage = (expenses.reduce((total, expense) => total + parseInt(expense.amount), 0) / parseInt(budgetAmount)) * 100;
    const progressBarWidth = Math.min((filledPercentage * 2), 200); // Limiting width to maximum 200px
    bar.style.width = progressBarWidth + 'px';

    if (filledPercentage >= 100) {
        bar.style.backgroundColor = 'red';
    } else {
        bar.style.backgroundColor = 'green';
    }
}

function updateNumericTracker() {
    const spentAmount = expenses.reduce((total, expense) => total + parseInt(expense.amount), 0);
    numericTracker.innerHTML = "Spent: $" + spentAmount;

    if (spentAmount >= parseInt(budgetAmount)) {
        numericTracker.style.color = 'red';
    } else {
        numericTracker.style.color = 'black';
    }
}

// Initial population
populateExpenses();
updateProgressBar();
updateNumericTracker();