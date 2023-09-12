// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});



// (START OF NICOLES PORTION)

// console.log("entered navbar js");

var outputTitle = document.getElementById("outputTitle");
var outputStart = document.getElementById("outputStart");
var outputEnd = document.getElementById("outputEnd");

function displayTitle() {
  outputTitle.innerHTML = chosenLocation.location;
}
var chosenLocation = JSON.parse(localStorage.getItem("chosen Location"));

displayTitle();

var date = new Date(chosenLocation.endDate);
var adjustedDate = new Date(
  date.getTime() + date.getTimezoneOffset() * 60 * 1000
);
var formattedEndDate = adjustedDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
outputEnd.innerHTML = formattedEndDate;

var date = new Date(chosenLocation.startDate);
var adjustedDate = new Date(
  date.getTime() + date.getTimezoneOffset() * 60 * 1000
);
var formattedStartDate = adjustedDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
outputStart.innerHTML = formattedStartDate;
// (END OF NICOLES PORTION)

/* If adding JS to your portion of navbar page please do not touch CSS that is above, it will mess up 
current look (ADD AT THE TOP AND BOTTOM OF YOUR SECTIONS YOUR NAME COMMENTED OUT TO AVOID GITHUB CONFLICTS ) */


//(START OF ALEJANDRA'S PORTION)

var visitButton = document.getElementById("placesToVisitButton");
visitButton.addEventListener("click", function () {
  window.location.href = "thingsToDo.html";
})

function replacePlacesToVisit() {
  var savedKeys = JSON.parse(localStorage.getItem('savedKeys'));

  if (savedKeys) {
    thingsToDoElement = document.getElementById("thingsToDoItemized")
    thingsToDoElement.innerHTML = "";

    savedKeys.forEach(function (key) {
      var item = localStorage.getItem(key);
      document.getElementById("thingsToDoItemized").innerHTML += key;
      console.log(item);
    });
  }
}


function populateThingsToDo() {
  console.log("Entered populate things to do");
  var savedKeys = JSON.parse(localStorage.getItem('savedKeys'));

  if (savedKeys) {
    console.log("saved keys grabbed");
    thingsToDoElement = document.getElementById("thingsToDoItemized")
    thingsToDoElement.innerHTML = "";

    savedKeys.forEach(function (key) {
      console.log("Key is" + key);
      var item = localStorage.getItem(key);
      item = JSON.parse(item);

      placesToVisitEl = document.getElementById("thingsToDoItemized");

      var itemBodyString = ("<div class=placeToVisitItem><h2>" + item.name + "</h2></div>");
      
      if (item.website) {
        itemBodyString += ("<div class=placeToVisitItemBody>" + "<a class = \"btn btn-info\" href=\"" + item.address + "\" target=\"_blank\">Visit Website</a><br><br>");
      } else {
        item.website = "No website address available";
        itemBodyString += ("<div class=placeToVisitItemBody><br><b><u>Website address:<br></u></b>" + item.website + "<br>");
      }
      
      itemBodyString += ("<b><u>Address:</u></b><br>" + item.address);

      if (item.phoneNumber) {
        itemBodyString += ("<br><br><b><u>Phone number:<br></u></b>" + item.phoneNumber + "<br><br></div>");
      } else {
        item.phoneNumber = "No phone number available";
        itemBodyString += ("<br><br><b><u>Phone number:<br></u></b>" + item.phoneNumber + "<br><br></div>");
      }

      placesToVisitEl.innerHTML += itemBodyString;

    })


    var visitButton = document.getElementById("placesToVisitButton");
    visitButton.addEventListener("click", function () {
      window.location.href = "thingsToDo.html";
    })

  }

  else {
    placesToVisitEl = document.getElementById("thingsToDoItemized");
    placesToVisitEl.innerHTML = ("<h5>It looks like you haven't added anything to your itinerary yet. Try looking for some places to visit!</p>");

  }


}


clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function () {
  console.log("clearItinerary clicked");

  var savedKeys = JSON.parse(localStorage.getItem('savedKeys'));

  console.log(savedKeys);

  if (savedKeys) {
    savedKeys.forEach(function (e) {
      localStorage.removeItem(e);
    });
  }

  if (localStorage.getItem("tempPlaceInfo")) {
    localStorage.removeItem("tempPlaceInfo");
  }

  localStorage.removeItem("savedKeys");

  placesToVisitEl = document.getElementById("thingsToDoItemized");
  placesToVisitEl.innerHTML = ("<h5>It looks like you haven't added anything to your itinerary yet. Try looking for some places to visit!</h5>");


});


//(END OF ALEJANDRA'S PORTION)


// (Yo's section)
var visitButton = document.getElementById("flightButton");
visitButton.addEventListener("click", function () {
  //code to show flights popup window
  $('#flightInfoModal').modal('show');
  // window.location.href = "flight2.html";
});

//RESTAURANT SECTION

var clearRestaurantsButton = document.getElementById("clearRestaurantsButton");

clearRestaurantsButton.addEventListener("click", function () {

  var inputKeys = JSON.parse(localStorage.getItem('inputKeys'));

  console.log(inputKeys);

  if (inputKeys) {
    inputKeys.forEach(function (e) {
      localStorage.removeItem(e);
    });
  }

  if (localStorage.getItem("tempRestaurantInfo")) {
    localStorage.removeItem("tempRestaurantInfo");
  }

  localStorage.removeItem("inputKeys");

  var restaurantsItemized = document.getElementById("restaurantsItemized");
  restaurantsItemized.innerHTML = ("<h5>It looks like you haven't added anything to your restuarant itinerary yet. Try looking for some places to visit!</h5>");


});

function populateRestaurants() {
  var inputKeys = JSON.parse(localStorage.getItem('inputKeys'));

  if (inputKeys) {
    thingsToDoElement = document.getElementById("restaurantsItemized")
    thingsToDoElement.innerHTML = "";

    inputKeys.forEach(function (key) {
      console.log("Key is" + key);
      var item = localStorage.getItem(key);
      item = JSON.parse(item);

      placesToVisitEl = document.getElementById("restaurantsItemized");
      
      var itemBodyString = ("<div class=placeToVisitItem><h2>" + item.name + "</h2></div>");
      
      if (item.website) {
        itemBodyString += ("<div class=placeToVisitItemBody><br>" + "<a class = \"btn btn-info\" href=\"" + item.address + "\" target=\"_blank\">Visit Website</a><br>");
      } else {
        item.website = "No website address available";
        itemBodyString += ("<div class=placeToVisitItemBody><br><b><u>Website address:<br></u></b>" + item.website + "<br>");
      }
      

      if (item.phoneNumber) {
        itemBodyString += ("<br><b><u>Phone number:<br></u></b>" + item.phoneNumber + "<br><br></div>");
      } else {
        item.phoneNumber = "No phone number available";
        itemBodyString += ("<br><b><u>Phone number:<br></u></b>" + item.phoneNumber + "<br><br></div>");
      }
      itemBodyString += ("<div class=placeToVisitItemBody><b><u>Address:</u></b><br>" + item.address);
      placesToVisitEl.innerHTML += itemBodyString;

    })


    // var visitButton = document.getElementById("placesToVisitButton");
    // visitButton.addEventListener("click", function () {
    //   window.location.href = "thingsToDo.html";
    // })

  }

  else {
    placesToVisitEl = document.getElementById("restaurantsItemized");
    placesToVisitEl.innerHTML = ("<h5>It looks like you haven't added anything to your itinerary yet. Try looking for some places to visit!</p>");
  }


}

var visitButton = document.getElementById("restaurantsButton");
visitButton.addEventListener("click", function () {
  window.location.href = "restaurant.html";
})

//initial population
populateThingsToDo();
populateRestaurants();