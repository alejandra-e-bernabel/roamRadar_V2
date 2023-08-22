document.addEventListener('DOMContentLoaded', () => {

    $('#dateRangeStartInput' ).daterangepicker({
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
        $(this).val(picker.startDate.format('MM-DD-YYYY') + ' - ' + picker.endDate.format('MM-DD-YYYY'));
    });

    $('#dateRangeStartInput').on('cancel.daterangepicker', function () {
        $(this).val('');
    });

    const openPopupButton = document.getElementById('openPopup');
    const closePopupButton = document.querySelector('.close');
    const flightInfoElement = document.getElementById('flightInfo');
    const airlineInput = document.getElementById('airlineInput');
    const flightNumberInput = document.getElementById('flightNumberInput');
    const dateRangeStartInput = document.getElementById('dateRangeStartInput');
    const saveFlightInfoButton = document.getElementById('saveFlightInfo');

    openPopupButton.addEventListener('click', () => {
        $('#flightInfoModal').modal('show');
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
            selectedEndDate
        }

        localStorage.setItem('flightInfo', JSON.stringify(flightInfo));
    });

});

