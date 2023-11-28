//this file switches the login and create account forms onscreen when user presses the links.

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("hidden");
        createAccountForm.classList.remove("hidden");
    })

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
    })

// for now, clicking create account just redirects back to login page.
    document.getElementById("createAccountButton").addEventListener("click", function() {
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
    } )

})

