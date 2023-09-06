// (START OF NICOLES PORTION)

console.log("entered navbar js");

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

function initMap() {
  var chosenLocation = JSON.parse(localStorage.getItem("chosen Location"));
  console.log("the chosen location is " + chosenLocation.location);

  map = new google.maps.Map(document.getElementById("map"), {
    center: google.maps.LatLng(0, 0),
    zoom: 15
  });
  
}



function getPlaceDetails(placeId) {
   placesToVisitEl = document.getElementById("thingsToDoItemized");

  

      //     placesToVisitEl.innerHTML += ("<div class=placeToVisitItem><h2>" + place.name + "</h2>");
      //     placesToVisitEl.innerHTML += ("<b><u>Address:</u></b><br>" + place.formatted_address + "<br><b><u>Rating:<br></u></b>" + place.rating);

      //     if (place.website) {
      //       placesToVisitEl.innerHTML += ("<br><b><u>Website address:<br></u></b>" + "<a href=\"" + place.website + "\" target=\"_blank\">" + place.website + "</a>");
      //     } else {
      //       place.website = "No website address available";
      //       placesToVisitEl.innerHTML += ("<br><b><u>Website address:<br></u></b>" + place.website);
      //     }

      //     placesToVisitEl.innerHTML += ("<br><b><u>Phone number:<br></u></b>" + place.formatted_phone_number + "<br><br></div>");
}
//   // Create a new PlacesService instance
//   const placesService = new google.maps.places.PlacesService(document.createElement('div'));

//   // Define the desired fields for place details
//   const fields = ["name", "formatted_address", "rating", "opening_hours", "photos", "website", "geometry", "formatted_phone_number", "user_ratings_total"];

//   // Call the getDetails method to retrieve the place details
//   placesService.getDetails({
//     placeId: placeId,
//     fields: fields
//   }, (placeResult, status) => {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       console.log(placeResult); // for testing purposes, you can modify this to do whatever you want with the place details
//     } else {
//       console.error(status);
//     }
//   });
// }

// function getPlaceDetails(Id) {

//   return new Promise((resolve, reject) => {
//     let request = {
//       placeId: Id,
//       fields: ["name", "formatted_address", "rating", "opening_hours", "photos", "website", "geometry", "formatted_phone_number", "user_ratings_total"]
//     };

//     let service = new google.maps.places.PlacesService(map);

//     service.getDetails(request, (place, status) => {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         resolve(place); // Resolve the promise with the place details
//       }
//       else {
//         reject(new Error(status)); // Reject the promise with an error
//       }
//     });
//   });

// }


 function populateThingsToDo () {
  var savedKeys = JSON.parse(localStorage.getItem('savedKeys'));

  if (savedKeys) {
    thingsToDoElement = document.getElementById("thingsToDoItemized")
    thingsToDoElement.innerHTML = "";

    // thingsToDoElement.innerHTML += ("<h3 class=noColor>Want to edit your itinerary?</h3>")
    // thingsToDoElement.innerHTML += ("<div class = thingsToDoItemized><button type=\"button\" id=\"placesToVisitButton\" class=\"btn btn-info\">Places to visit</button>");
    // thingsToDoElement.innerHTML += ("<button type = \"button\" id = \"checkItinerary\" class=\"btn btn-info\">Show Itinerary</button></div>");



    savedKeys.forEach(function (key) {
      console.log ("Key is" + key);
      var item = localStorage.getItem(key);
      item = JSON.parse(item);

      // getPlaceDetails(item);

      // getPlaceDetails(item)
      //   .then((place) => {

      placesToVisitEl = document.getElementById("thingsToDoItemized");

      var itemBodyString = ("<div class=placeToVisitItem><h2>" + item.name + "</h2></div>");
      itemBodyString += ("<div class=placeToVisitItemBody><b><u>Address:</u></b><br>" + item.address);

      if (item.website) {
             itemBodyString += ("<br><b><u>Website address:<br></u></b>" + "<a href=\"" + item.address + "\" target=\"_blank\">" + item.website + "</a>");
            } else {
              item.website = "No website address available";
              itemBodyString += ("<br><b><u>Website address:<br></u></b>" + item.website);
            }
  
            itemBodyString += ("<br><b><u>Phone number:<br></u></b>" + item.phoneNumber + "<br><br></div>");
            placesToVisitEl.innerHTML += itemBodyString;

      // placesToVisitEl.innerHTML += ("<div class=placeToVisitItem><h2>" + item.name + "</h2></div>");
      // placesToVisitEl.innerHTML += ("<div class=placeToVisitItemBody><b><u>Address:</u></b><br>" + item.address);

      // if (item.website) {
      //       placesToVisitEl.innerHTML += ("<br><b><u>Website address:<br></u></b>" + "<a href=\"" + item.address + "\" target=\"_blank\">" + item.website + "</a>");
      //     } else {
      //       item.website = "No website address available";
      //       placesToVisitEl.innerHTML += ("<br><b><u>Website address:<br></u></b>" + item.website);
      //     }

      //     placesToVisitEl.innerHTML += ("<br><b><u>Phone number:<br></u></b>" + item.phoneNumber + "<br><br></div>");

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
  const tables = document.querySelectorAll("table tr");

  var savedKeys = JSON.parse(localStorage.getItem('savedKeys'));

  console.log(savedKeys);

  if (savedKeys) {
    savedKeys.forEach(function (e) {
      localStorage.removeItem(e);
    });
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


    // var visitButton = document.getElementById("hotelButton");
    // visitButton.addEventListener("click", function () {
    // window.location.href = "hotels.html";
    // })

    //  var budgetButton = document.getElementById("budgetButton");
    //  budgetButton.addEventListener("click", function () {
    //    window.location.href = "itinerary.html";
    //  });
     var resturantButton = document.getElementById("goToRestaurants");
     resturantButton.addEventListener("click", function () {
       window.location.href = "restaurant.html";
     });


//initial population
populateThingsToDo();