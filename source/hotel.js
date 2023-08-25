document.addEventListener('DOMContentLoaded', populateSections);

function createSections() {
    let numNights = document.getElementById('numNights').value;
    let sectionsContainer = document.getElementById('sectionsContainer');

    sectionsContainer.innerHTML = '';

    for (let i = 0; i < numNights; i++) {
        let section = document.createElement('section');

        let hotelNameLabel = document.createElement('label');
        hotelNameLabel.textContent = 'Hotel name:';
        let hotelNameInput = document.createElement('input');
        hotelNameInput.type = 'text';
        hotelNameInput.name = 'hotelName';

        hotelNameInput.classList.add ("form-inline");
        hotelNameInput.classList.add ("hotelNameInput");

        hotelNameInput.placeholder = 'Enter hotel name';
        section.appendChild(hotelNameLabel);
        section.appendChild(hotelNameInput);

        let addressLabel = document.createElement('label');
        addressLabel.textContent = 'Address:';
        let addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.name = 'address';

        addressInput.classList.add ("form-inline");
        addressInput.classList.add ("addressInput");

        addressInput.placeholder = 'Enter hotel address';
        section.appendChild(addressLabel);
        section.appendChild(addressInput);

        let additionalNotesLabel = document.createElement('label');
        additionalNotesLabel.textContent = 'Additional notes:';
        let additionalNotesInput = document.createElement('textarea');
        additionalNotesInput.name = 'additionalNotes';

        additionalNotesInput.classList.add ("form-control");
        additionalNotesInput.classList.add ("additionalNotesInput");


        additionalNotesInput.placeholder = 'Enter additional notes';
        section.appendChild(additionalNotesLabel);
        section.appendChild(additionalNotesInput);

        sectionsContainer.appendChild(section);
    }
}

function populateSections() {
    let storedData = JSON.parse(localStorage.getItem('itinerary'));

    if (storedData) {
        let numNightsInput = document.getElementById('numNights');
        numNightsInput.value = storedData.length;

        createSections();

        let hotelNameInputs = document.getElementsByName('hotelName');
        let addressInputs = document.getElementsByName('address');
        let additionalNotesInputs = document.getElementsByName('additionalNotes');

        for (let i = 0; i < storedData.length; i++) {
            hotelNameInputs[i].value = storedData[i].hotelName;
            addressInputs[i].value = storedData[i].address;
            additionalNotesInputs[i].value = storedData[i].additionalNotes;
        }
    }
}

window.addEventListener('beforeunload', saveSections);

function saveSections() {
    let hotelNameInputs = document.getElementsByName('hotelName');
    let addressInputs = document.getElementsByName('address');
    let additionalNotesInputs = document.getElementsByName('additionalNotes');

    let data = [];

    for (let i = 0; i < hotelNameInputs.length; i++) {
        let hotelName = hotelNameInputs[i].value;
        let address = addressInputs[i].value;
        let additionalNotes = additionalNotesInputs[i].value;
        data.push({
            hotelName: hotelName,
            address: address,
            additionalNotes: additionalNotes
        });
    }

    localStorage.setItem('itinerary', JSON.stringify(data));
}

function clearSections() {
    localStorage.removeItem('itinerary');
    document.getElementById('numNights').value = '';
    document.getElementById('sectionsContainer').innerHTML = "<b>No lodgings have been entered yet.</b>";
}