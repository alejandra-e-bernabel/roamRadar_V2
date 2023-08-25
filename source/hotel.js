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
        hotelNameInput.placeholder = 'Enter hotel name';
        section.appendChild(hotelNameLabel);
        section.appendChild(hotelNameInput);

        let additionalNotesLabel = document.createElement('label');
        additionalNotesLabel.textContent = 'Additional notes:';
        let additionalNotesInput = document.createElement('textarea');
        additionalNotesInput.name = 'additionalNotes';
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
        let additionalNotesInputs = document.getElementsByName('additionalNotes');

        for (let i = 0; i < storedData.length; i++) {
            hotelNameInputs[i].value = storedData[i].hotelName;
            additionalNotesInputs[i].value = storedData[i].additionalNotes;
        }
    }
}

window.addEventListener('beforeunload', saveSections);

function saveSections() {
    let hotelNameInputs = document.getElementsByName('hotelName');
    let additionalNotesInputs = document.getElementsByName('additionalNotes');

    let data = [];

    for (let i = 0; i < hotelNameInputs.length; i++) {
        let hotelName = hotelNameInputs[i].value;
        let additionalNotes = additionalNotesInputs[i].value;
        data.push({
            hotelName: hotelName,
            additionalNotes: additionalNotes
        });
    }

    localStorage.setItem('itinerary', JSON.stringify(data));
}