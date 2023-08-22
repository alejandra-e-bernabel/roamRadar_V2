//this file calls the auth.js file to authenticate user.

const auth = new Auth();

document.querySelector(".logOut").addEventListener("click", (e) => {
    auth.logOut();
})