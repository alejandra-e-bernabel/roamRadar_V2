const flightInfoDisplay = document.getElementById("flightInfoDisplay");


document.addEventListener('DOMContentLoaded', () => {
    const closePopupButton = document.querySelector('.close');
    const flightInfoElement = document.getElementById('flightInfo');
    const airlineInput = document.getElementById('airlineInput');
    const flightNumberInput = document.getElementById('flightNumberInput');
    const dateRangeStartInput = document.getElementById('dateRangeStartInput');
    const saveFlightInfoButton = document.getElementById('saveFlightInfo');
    const clearFlightsButton = document.getElementById("clearFlightsButton");

    $('#dateRangeStartInput').daterangepicker({
        opens: 'left',
        autoUpdateInput: false,
        locale: {
            format: 'MM-DD-YYYY',
            cancelLabel: 'Clear'
        }
    });

    $('#openDateRangePicker').on('click', function () {
        $('#dateRangeStartInput').data('daterangepicker').show();
    });

    $('#dateRangeStartInput').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM-DD-YYYY') + ' to ' + picker.endDate.format('MM-DD-YYYY'));
    });

    $('#dateRangeStartInput').on('cancel.daterangepicker', function () {
        $(this).val('');
    });

    closePopupButton.addEventListener('click', () => {
        $('#flightInfoModal').modal('hide');
    });

    saveFlightInfoButton.addEventListener('click', () => {
        const airline = airlineInput.value;
        const flightNumber = flightNumberInput.value;
        const selectedStartDate = dateRangeStartInput.value;
        const flightInfo = {
            airline,
            flightNumber,
            selectedStartDate,
            // selectedEndDate
        }

        localStorage.setItem('flightInfo', JSON.stringify(flightInfo));
        populateFlights();
        $('#flightInfoModal').modal('hide');
    });

});

function populateFlights () {
    if (localStorage.getItem("flightInfo")) {
        const savedFlightInfo = JSON.parse(localStorage.getItem("flightInfo"));
        flightInfoDisplay.innerHTML = "<p><b>Airline:</b> " + savedFlightInfo.airline + "</p>";
        flightInfoDisplay.innerHTML += "<p><b>Flight Number:</b> " + savedFlightInfo.flightNumber + "</p>";
        flightInfoDisplay.innerHTML += "<p><b>Flight Dates:</b> " + savedFlightInfo.selectedStartDate + "</p>";
    }
}

function clearFlightInfo() {
    if (localStorage.getItem("flightInfo")) {
        localStorage.removeItem("flightInfo");
    }

    flightInfoDisplay.innerHTML = "No flights added yet.";
}

//initial population
if (localStorage.getItem("flightInfo")) {
    populateFlights();
} else {
    flightInfoDisplay.innerHTML = "No flights added yet.";
}
