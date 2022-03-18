window.onload = function () {
    setInterval(updateTime, 1000);
}

function updateTime() {
    const hourEL = document.getElementById('hour');
    const minEL = document.getElementById('minute');
    const secondEL = document.getElementById('second');
    const dateEL = document.getElementById('date');
    const dayEL = document.getElementById('day');
    const tzEL = document.getElementById('timezone');


    const nth = function (d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    
    let date = d.getDate();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()];
    let year = d.getFullYear();

    var dateString = date + nth(date) + ' ' + month + ' ' + year;

    let dayNumber = d.getDay(), day = "";
    let timeZone = d.toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'long' }).substring(4);

    switch (dayNumber) {
        case 0: day = "Sunday"; break;
        case 1: day = "Monday"; break;
        case 2: day = "Tuesday"; break;
        case 3: day = "Wednesday"; break;
        case 4: day = "Thursday"; break;
        case 5: day = "Friday"; break;
        case 6: day = "Saturday"; break;
    }

    if (hours >= 0 && hours <= 9) hours = "0" + hours;
    if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes;
    if (seconds >= 0 && seconds <= 9) seconds = "0" + seconds;


    hourEL.innerHTML = hours;
    minEL.innerHTML = minutes;
    secondEL.innerHTML = seconds;

    dateEL.innerHTML = dateString;
    dayEL.innerHTML = day;
    tzEL.innerHTML = timeZone;

}