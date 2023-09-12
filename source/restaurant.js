
    function initMap() {
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),
        {
            types:['geocode']
        });
        autocomplete.addListener('place_changed', searchNearbyRestaurants);
	}	
        // function initializeMap() {
        //     var initialLocation = { lat:28.381234066504312, lng:-81.61096094887043};
        //     var map = new google.maps.Map(document.getElementById('map'),{
        //         center: initialLocation,
        //         zoom: 10
        //     });
        // }
    
    // function searchNearbyRestaurants(){
    //      document.getElementById('type').onchange = searchNearbyRestaurants
    
    function searchNearbyRestaurants(){
		// console.log("Selected searchNearbyRestaurants");

        //this grabs the table item from html and clears it out
        document.getElementById('restaurants').innerHTML = "<tr><th><b>Contact Information</b></th><th><b>Location Image</b></th></tr>";

        var restaurant = autocomplete.getPlace();

        map = new google.maps.Map(document.getElementById('map'), {
            center: restaurant.geometry.location,
            zoom: 15
        });

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: restaurant.geometry.location,
            radius: '5000',
            type: [document.getElementById("type").value]
        }, callback)
    }

    function callback(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK) {
        //    console.log(results.length)
           for(var i = 0; i < results.length; i++) {
               createMarker(results[i]);
        }
        addButton();
	}
	}

    function createMarker(restaurant) {
        // console.log(restaurant);
        var table = document.getElementById("restaurants");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);

        var htmlString = ("<div class = tableItemName>" + restaurant.name + "</div><br>");

        if (!restaurant.rating) {
            restaurant.rating = "No rating available";
        }

        if (!restaurant.vicinity) {
            restaurant.vicinity = "No address available";
        }
        htmlString += ("<div class=itemInformation><p><b><u>Rating</u></b>: " + restaurant.rating+ "</p>");
        htmlString += ("<p><b><u>Address</u></b>: " + restaurant.vicinity + "</p>");

        if (restaurant.price_level) {
            if (restaurant.price_level == 1) {
                restaurant.price_level = "$";
            } else if (restaurant.price_level == 2) {
                restaurant.price_level = "$$";
            } else if (restaurant.price_level ==3) {
                restaurant.price_level = "$$$"
            } else {
                restaurant.price_level = "$$$$";
            }
        } else {
            restaurant.price_level = "No price information available"
        }

        htmlString += ("<p><b><u>Price level</u></b>: " + restaurant.price_level + "</p></div>"); 
        cell1.innerHTML = htmlString;

        if(restaurant.photos) {
            var image = document.createElement("img");
            image.src = restaurant.photos[0].getUrl();
            let cell2 = row.insertCell(1);
            image.width = 225;
            image.height = 150;
            // image.style.borderRadius = 50;
            cell2.innerHTML = image.outerHTML;
            cell2.innerHTML += ("<div class=buttonContainer><button type=button id=" + restaurant.place_id +" class=\"addItem form-control btn btn-warning\">Add to Itinerary</button></div>");

        } else { 
            const image = document.createElement("img");
            image.src = "./images/roam_radar_200x300.png";
            let cell2 = row.insertCell(1);
            image.width = 225;
            image.height = 150;
            image.style.borderRadius = 50; 
            cell2.innerHTML = image.outerHTML;
            cell2.innerHTML += ("<div class=buttonContainer><button type=button id=" + restaurant.place_id +" class=\"addItem form-control btn btn-warning\">Add to Itinerary</button></div>");

            }

        }

    document.getElementById("type").onchange = searchNearbyRestaurants;
    
    function addButton() {
        const groupId = document.querySelectorAll('button');
        groupId.forEach(button => {
            //temporary way to check which buttons were grabbed
            // button.style.backgroundColor = "red";
            button.addEventListener("click", saveGroupToLocalStorage);
        });

    function saveGroupToLocalStorage(event) {

        // console.log("button was clicked");
        var group = event.currentTarget;

        group.style.background ="white";

        var content = group.id;
        console.log("id is " + content);

        retrieveDetailsByID(content)
            .then((restaurant) => {

                var tempRestaurant = {
                    name: restaurant.name,
                    address: restaurant.formatted_address,
                    phoneNumber: restaurant.formatted_phone_number,
                    website: restaurant.website
                };

                tempRestaurant = JSON.stringify(tempRestaurant);

                localStorage.setItem("tempRestaurantInfo", tempRestaurant);

                // var jsonString = localStorage.getItem("tempRestaurantInfo");
                // JSON.parse(jsonString);
                // console.log("from jsonstring:" + JSON.parse(jsonString).name);
                // var placeToSave = JSON.parse(jsonString);


        const restaurantId = generateUniqId();

        let isContSaved = false;
        for(let i =0; i < localStorage.length; i++) {
            const storedCont = localStorage.getItem(localStorage.key(i));
            if (content === storedCont) {
                isContSaved = true;
                break;
            }
        }

        if (!isContSaved){
         localStorage.setItem(restaurantId, localStorage.getItem("tempRestaurantInfo"));


         const inputKeys = JSON.parse(localStorage.getItem('inputKeys')) || [];
         inputKeys.push(restaurantId);
         localStorage.setItem('inputKeys', JSON.stringify(inputKeys));

         console.log("restaurant with ID" +  groupId  + " saved to local storage.");
        } else { 
        console.log("restaurant with ID" +  groupId  + " already exists in local storage.");
        }
    })
}
    
    function generateUniqId() {
        return Math.random().toString(36).substring(2,10);
    }
  }

  
function retrieveDetailsByID(Id) {

    return new Promise((resolve, reject) => {
        let request = {
            placeId: Id,
            fields: ["name", "formatted_address", "rating", "opening_hours", "photos", "website", "geometry", "formatted_phone_number", "user_ratings_total"]
        };

        let service = new google.maps.places.PlacesService(map);

        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log("place details retrieved");
                resolve(place); // Resolve the promise with the place details
            }
            else {
                reject(new Error(status)); // Reject the promise with an error
            }
        });
    });

}

  clearAllButton = document.getElementById("clearAllButton");
  clearAllButton.addEventListener("click", function () {
    console.log ("clearAllButton was clicked");
    var restaurantTables = document.querySelectorAll(".restaurantTable");
    restaurantTables.forEach(function (restaurantTable) {
        restaurantTables.style.background = "beige";
    })
        var inputKeys = JSON.parse(localStorage.getItem('inputKeys'));
        inputKeys.forEach(function (event) {
            console.log("Saved key: " + event);
        });
    
    if (inputKeys) {
        inputKeys.forEach(function (event) {
            console.log ("Key " + event + " Removed");
            localStorage.removeItem(event);
        });
    } else {
        console.log("No input keys grabbed");
    }
       
  localStorage.removeItem("inputKeys");
  localStorage.removeItem("tempRestaurantInfo")
  localStorage.setItem('inputKeys',JSON.stringify([]));
});