/**
 * Created by Samuel Beckingham-Cook on 10/03/2016.
 */

function romanconvertto() {
    var input = document.getElementById('numberInput').value;
    document.getElementById('numeralInput').value = Roman.convertTo(input);
}

function romanconvertfrom() {
    var input = document.getElementById('numeralInput').value;
    document.getElementById('numberInput').value = Roman.convertFrom(input);
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days.convertTo();
        hoursSpan.innerHTML = t.hours.convertTo();
        minutesSpan.innerHTML = t.minutes.convertTo();
        secondsSpan.innerHTML = t.seconds.convertTo();

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var now = new Date();
var currentYear = now.getFullYear();
var thisBirthday = new Date(Date.parse('04/23/' + currentYear + ' 00:00:00'));
var nextBirthday = function() {
    if (thisBirthday < now) {
        return Date.parse('04/23/' + (currentYear+1) + ' 00:00:00')
    }
    return thisBirthday;
};
initializeClock('clockdiv', nextBirthday());