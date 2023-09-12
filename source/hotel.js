document.addEventListener('DOMContentLoaded', populateSections);

function createSections() {
    let numNights = document.getElementById('numNights').value;
    let sectionsContainer = document.getElementById('sectionsContainer');

    sectionsContainer.innerHTML = '';

    for (let i = 0; i < numNights; i++) {
        let section = document.createElement('section');
        section.classList.add('lodgingSection');

        //hotel name
        let form = document.createElement('form');
        form.classList.add('nameAndAddress');

        let row = document.createElement('div');
        row.classList.add('row');

        let col1 = document.createElement('div');
        col1.classList.add('col');
        let hotelNameLabel = document.createElement('label');
        hotelNameLabel.innerHTML = '<b>Hotel name:</b>';
        let hotelNameInput = document.createElement('input');
        hotelNameInput.type = 'text';
        hotelNameInput.name = 'hotelName';
        hotelNameInput.classList.add ("form-control");
        
        hotelNameInput.classList.add ("hotelNameInput");
        hotelNameInput.placeholder = 'Enter hotel name';
        col1.appendChild(hotelNameLabel);
        col1.appendChild(hotelNameInput);
        hotelNameInput.placeholder = 'Enter hotel name';
        col1.appendChild(hotelNameLabel);
        col1.appendChild(hotelNameInput);


        // hotel address
        let col2 = document.createElement('div');
        col2.classList.add('col');
        let addressLabel = document.createElement('label');
        addressLabel.innerHTML = '<b>Address:</b>';
        let addressInput = document.createElement('input');
        addressInput.type = 'text';
        addressInput.name = 'address';

        addressInput.classList.add ("form-control");
        addressInput.classList.add ("addressInput");

        addressInput.placeholder = 'Enter hotel address';
        col2.appendChild(addressLabel);
        col2.appendChild(addressInput);

        row.appendChild(col1);
        row.appendChild(col2);
        form.appendChild(row);
        section.appendChild(form);

        //additional notes
        let additionalNotesContainer = document.createElement('div');
        additionalNotesContainer.classList.add("additionalNotesContainer")

        let additionalNotesLabel = document.createElement('label');
        additionalNotesLabel.innerHTML = '<b>Additional notes:</b>';
        let additionalNotesInput = document.createElement('textarea');
        additionalNotesInput.name = 'additionalNotes';

        additionalNotesInput.classList.add ("form-control");
        additionalNotesInput.classList.add ("additionalNotesInput");


        additionalNotesInput.placeholder = 'Enter additional notes';

        section.appendChild(additionalNotesContainer)
        additionalNotesContainer.appendChild(additionalNotesLabel);
        additionalNotesContainer.appendChild(additionalNotesInput);

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

    sectionsContainer = document.getElementById('sectionsContainer')
    sectionsContainer.innerHTML = "<b>No lodgings have been entered yet.</b>";

}