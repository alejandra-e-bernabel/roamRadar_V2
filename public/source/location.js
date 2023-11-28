// Load the .env file
require('dotenv').config();

// Access the API key from the .env file
const apiKey = process.env.API_KEY;

// Replace the placeholder in the HTML script tag with the actual API key
const scriptTag = document.querySelector('script[src*=maps.googleapis]');
scriptTag.src = scriptTag.src.replace('API_KEY', apiKey);

var startTripBtn = document.getElementById("startTripBtn");
var whereToBox = document.getElementById("floatingInput");
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");

var hasWarning = false;
var autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.querySelector(".autocomplete"),
    {
      types: ["(cities)"],
    }
  );
}

var searchCity = JSON.parse(window.localStorage.getItem("searchCity")) || [];

startTripBtn.addEventListener("click", function () {
  if (whereToBox.value === "") {
    if (!hasWarning) {
      var warning = document.createElement("p");
      warning.setAttribute("id", "warning");
      warning.innerHTML = "Choose a destination to start planning";
      document.body.appendChild(warning);
      hasWarning = true;
    }
  } else {
    window.location.href = "navbar.html";
  }

 var preferredDestination = {
   location: whereToBox.value,
   startDate: startDate.value,
   endDate: endDate.value,
 };
  localStorage.setItem("chosen Location", JSON.stringify(preferredDestination));
 
});

var storedData = JSON.parse(localStorage.getItem("Chosen Location")) || [];


