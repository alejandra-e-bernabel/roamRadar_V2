function initMap() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
            types: ["geocode"]
        });

    autocomplete.addListener("place_changed", searchNearbyPlaces);

}

function searchNearbyPlaces() {

    // console.log("Entered SearchNearbyPlaces Function");

    //resets table in case user enters a different location
    document.getElementById("places").innerHTML = "<tr><th>Contact information</th><th>Open hours</th><th class=hide-on-medium>Location Image</th></tr>";

    var place = autocomplete.getPlace();
    // console.log(place);

    map = new google.maps.Map(document.getElementById("map"), {
        center: place.geometry.location,
        zoom: 15
    });

    // console.log([document.getElementById("type").value]);

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: place.geometry.location,
        radius: "5000",
        type: [document.getElementById("type").value]

    }, callback);

}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        // console.log("There are this many results: " + results.length);
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
        addButton();
    }
}

function getPlaceDetails(Id) {
    return new Promise((resolve, reject) => {
        let request = {
            placeId: Id,
            fields: ["name", "formatted_address", "rating", "opening_hours", "photos", "website", "geometry", "formatted_phone_number", "user_ratings_total"]
        };

        let service = new google.maps.places.PlacesService(map);

        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                resolve(place); // Resolve the promise with the place details
            }
            else {
                reject(new Error(status)); // Reject the promise with an error
            }
        });
    });

}

function callbackDetails(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        // console.log('There are this many results:', results);
    }
}

function createMarker(place) {
    console.log("place from createMarker:" + place.name + place.place_id + place.website);
    var id = place.place_id;
    var table = document.getElementById("places");
    var row = table.insertRow();

    // var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // cell0.innerHTML = "<button type=button id=addItineraryButton class=\"btn-lg addItineraryButton btn btn-info\">Add to Itinerary</button>";

    row.classList.add(place.place_id);


    getPlaceDetails(id)
        .then((place) => {
            // Access the place details and use them as needed
            // console.log(place.name);
            // console.log(place.formatted_address);
            // console.log(place.rating);
            // console.log(place.opening_hours);
            // console.log(place.website);
            // console.log(place.formatted_phone_number);

            if (!place.formatted_address) {
                place.formatted_address = "No address available";
            }

            if (!place.rating) {
                place.rating = "No rating available";
            }

            if (!place.opening_hours) {
                place.opening_hours = "No opening hours available";
            }

            if (!place.formatted_phone_number) {
                place.formatted_phone_number = "No phone number available";
            }

            var htmlString = ("<div class = tableItemName>" + place.name + "</div><div class=visitWebsiteButton>");

            if (place.website) {
                htmlString += ("<a class=\"tableButton btn btn-dark btn-sm\" href=\"" + place.website + "\" target=\"_blank\" rel=\"noopener noreferrer\">Visit website</a>");
            } else {
                place.website = "No website address available";
                // htmlString += ("<b><u>Website address:</u></b> " + place.website);
            }

            htmlString += ("<button type=button id=" + place.place_id +" class=\"tableButton addItem btn btn-warning btn-sm\">Add to Itinerary</button></div>");


            htmlString += ("<div class=itemInformation><p><b><u>Address</u></b>: " + place.formatted_address + "</p><p><b><u>Rating</u></b>: " + place.rating + "</p>");

            htmlString += ("<p><b><u>Phone number</u></b>: " + place.formatted_phone_number + "</p></div>");

            cell1.innerHTML = htmlString;


            //saves location ID as the class of the item


            if (place.opening_hours.weekday_text) {
                // console.log(place.opening_hours.weekday_text);
                cell2.classList.add("openHoursCell");
                cell2.innerHTML += (place.opening_hours.weekday_text[0]);
                cell2.innerHTML += ("<br>" + place.opening_hours.weekday_text[1]);
                cell2.innerHTML += ("<br>" + place.opening_hours.weekday_text[2]);
                cell2.innerHTML += ("<br>" + place.opening_hours.weekday_text[3]);
                cell2.innerHTML += ("<br>" + place.opening_hours.weekday_text[4]);
                cell2.innerHTML += ("<br>" + place.opening_hours.weekday_text[5]);
                cell2.innerHTML += ("<br>" + place.opening_hours.weekday_text[6]);

            } else {
                cell2.innerHTML = "No hours available";
            }


        })
        .catch((error) => {
            // Handle the error if the API request fails
            console.error(error);
        });


    if (place.photos) {
        const image = document.createElement("img");
        image.src = place.photos[0].getUrl();
        let cell3 = row.insertCell(2);
        cell3.classList.add("hide-on-medium");
        image.width = 300;
        image.height = 200;
        image.style.borderRadius = 50;
        cell3.innerHTML = image.outerHTML;
    }

    else {
        const image = document.createElement("img");
        image.src = "./images/roam_radar_200x300.png";
        let cell3 = row.insertCell(2);
        cell3.classList.add("hide-on-medium");
        image.width = 300;
        image.height = 200;
        image.style.borderRadius = 50;
        cell3.innerHTML = image.outerHTML;
    }


}

document.getElementById("type").onchange = searchNearbyPlaces;

function addButton() {
    const rows = document.querySelectorAll('button');
    // Add event listener to each row
    rows.forEach(function (button, index) {
        if (index != 0) {
            button.addEventListener("click", saveRowToLocalStorage);
        }

    });

    // Event listener function
    function saveRowToLocalStorage(event) {
        // Get the row that was clicked
        const row = event.currentTarget;

        row.style.background = "beige";

        // Get the content of the row
        const content = row.classList.toString();

        retrieveDetailsByID(content)
            .then((place) => {

                var tempLocation = {
                    name: place.name,
                    address: place.formatted_address,
                    phoneNumber: place.formatted_phone_number,
                    website: place.website
                };

                tempLocation = JSON.stringify(tempLocation);

                localStorage.setItem("tempPlaceInfo", tempLocation);

                var jsonString = localStorage.getItem("tempPlaceInfo");
                JSON.parse(jsonString);
                console.log("from jsonstring:" + JSON.parse(jsonString).name);
                // var placeToSave = JSON.parse(jsonString);

                // Generate a unique ID for the row
                const rowId = generateUniqueId();

                //save unique ID to key savedThingsToDo


                let isContentSaved = false;
                for (let i = 0; i < localStorage.length; i++) {
                    const storedContent = localStorage.getItem(localStorage.key(i));
                    if (content === storedContent) {
                        isContentSaved = true;
                        break;
                    }
                }


                if (!isContentSaved) {
                    // Save the row content to local storage with the unique ID
                    localStorage.setItem(rowId, localStorage.getItem("tempPlaceInfo"));
                    //localStorage.setItem(rowId, JSON.stringify(content));


                    // Add the key to the array of keys in local storage
                    const savedKeys = JSON.parse(localStorage.getItem('savedKeys')) || [];
                    savedKeys.push(rowId);
                    localStorage.setItem('savedKeys', JSON.stringify(savedKeys));
                    console.log("Row with ID" + rowId + "saved to local storage.");
                } else {
                    console.log("Row with ID" + rowId + "already exists in local storage.");
                }
            })
    }

    // Function to generate a unique ID for each row
    function generateUniqueId() {
        return Math.random().toString(36).substring(2, 9);
    }
}

clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function () {
    const tables = document.querySelectorAll("table tr");
    tables.forEach(function (table) {
        table.style.background = "#87CEFA";

        var savedKeys = JSON.parse(localStorage.getItem('savedKeys'));

        // console.log(savedKeys);

        if (savedKeys) {
            savedKeys.forEach(function (e) {
                localStorage.removeItem(e);
            });
        }

        localStorage.removeItem("savedKeys");
    });

});


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
