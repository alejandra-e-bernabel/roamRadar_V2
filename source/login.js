//this file submits the form if there is no error. It does not submit the form if there is no error.
//Error is also shown on HTML.

class login {
    constructor(form, fields) {
        this.form = form;
        this.fields= fields;
        this.validateOnSubmit();
    }

    validateOnSubmit() {

        this.form.addEventListener ("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById ("pass").value;
            var error = 0;

            //error messages
            if (username == "" && password == "") {
                error ++;
                this.setStatus("Please enter username and password", "error");
            }

            else if (username == "") {
                error++;
                this.setStatus("Username cannot be blank", "error");
            }

            else if (password == "") {
                error++;
                this.setStatus("Password cannot be blank. Please try again.", "error");
            }
            
            //submits form if there is no error
            if (error == 0) {
                localStorage.setItem("auth",1);
                //this.form.submit();

                //if the user has not chosen a destination, they are taken to location page
                //if user has chosen a distination, they are taken to navbar.html
                if (localStorage.getItem("chosen Location")==null){
                    window.location.href= "location.html";
                }
                
                else {
                    window.location.href= "navbar.html";
                }
            }
        }) 
    }

    setStatus (message,status) {
        const errorMessage = document.querySelector(".loginErrorMessage");
        if (status == "error") {
            errorMessage.innerHTML = message;
            
        }
    }
}

const form = document.querySelector (".login");
//if the form is set, we want to pass the fields.
if (form) {
    const fields = ["username", "password"];
    new login(form, fields);
}

