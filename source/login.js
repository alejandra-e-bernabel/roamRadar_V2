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
            console.log ("Username: " + username + " Password: " + password);

            var error = 0;

            //error messages
            if (username == "" && password == "") {
                error ++;
                this.setStatus("Please enter username and password", "error");
                console.log ("An error has been recorded: both username and password are empty");
            }

            else if (username == "") {
                error++;
                this.setStatus("Username cannot be blank", "error");
                console.log ("An error has been recorded on username");
            }

            else if (password == "") {
                error++;
                this.setStatus("Password cannot be blank. Please try again.", "error");
                console.log ("An error has been recorded on password");
            }
            
            //submits form if there is no error
            if (error == 0) {
                console.log ("The form would be submitted in this case");
                localStorage.setItem("auth",1);
                //this.form.submit();

                //if the user has not chosen a destination, they are taken to location page
                //if user has chosen a distination, they are taken to navbar.html
                if (localStorage.getItem("chosen Location")==null){
                    // console.log(localStorage.getItem("chosen Location"));
                    window.location.href= "location.html";
                }
                
                else {
                    // console.log(localStorage.getItem("chosen Location"));
                    window.location.href= "navbar.html";
                }
                // window.location.href= "location.html";
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
    console.log ("the form was entered");
    const fields = ["username", "password"];
    new login(form, fields);
}

