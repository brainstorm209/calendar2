var calendar;
var currEvent;
var editMode = false;

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'bootstrap5',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today'
            // right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialDate: Date.now(),
        navLinks: true, // can click day/week names to navigate views
        selectable: true,
        selectMirror: true,
        select: function (arg) {
            $("#startDate").val(arg.startStr)
            $("#endDate").val(arg.endStr)
            $("#myModal").modal("show");
        },
        eventClick: function (arg) {
            $('#eventTitleInfo').html(arg.event.title);
            $('#startDateInfo').html(arg.event.startStr);
            $('#endDateInfo').html(arg.event.endStr);
            currEvent = arg.event;
        },
        editable: true,
        dayMaxEvents: true
    });
    calendar.render();
});

function showEventModal() {

}

function saveEvent() {
    if ($('#eventTitle').val() != '') {
        if (editMode) {
            currEvent.setProp('category', $('#eventcategory').val());
            currEvent.setProp('title', $('#eventTitle').val());
            currEvent.setStart($('#startDate').val());
            currEvent.setEnd($('#endDate').val());
        } else {
            currEvent = calendar.addEvent({
                title: $('#eventTitle').val(),
                start: $('#startDate').val(),
                end: $('#endDate').val(),
                allDay: true
            });
        }
        $('#eventTitleInfo').html(currEvent.title);
        $('#startDateInfo').html(currEvent.startStr);
        $('#endDateInfo').html(currEvent.endStr);

        $("#myModal").modal("hide");
    } else {
        $('#eventTitle').focus();
    }
}

function editEvent() {
    if (currEvent) {
        editMode = true;
        $("#myModalLabel").html("Edit event");
        $('#eventTitle').val(currEvent.title);
        $('#startDate').val(currEvent.startStr);
        $('#endDate').val(currEvent.endStr);
        $("#myModal").modal("show");
    } else {
        alert('Please select an event to edit.');
    }
}

function deleteEvent() {
    if (currEvent) {
        if (confirm('Are you sure want to remove this event?')) {
            $('#eventTitleInfo').html("");
            $('#startDateInfo').html("");
            $('#endDateInfo').html("");
            currEvent.remove();
        }
    } else {
        alert('Please select an event to remove.');
    }
}

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

$(function () {
    $('#myModal').on('shown.bs.modal', function () {
        $('#eventTitle').focus();
    });
    $('#myModal').on('hidden.bs.modal', function () {
        editMode = false;
        $("#myModalLabel").html("Add an event");
        $('#eventTitle').val('');
        $('#startDate').val(new Date().toDateInputValue());
        $('#endDate').val(new Date().toDateInputValue());
    });
    $('#startDate').val(new Date().toDateInputValue());
    $('#endDate').val(new Date().toDateInputValue());
})