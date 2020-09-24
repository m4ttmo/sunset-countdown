
var x = "23:05:55 PM"
var lat;
var lng;
var timeNotice = document.getElementById("time");
var sunOffset = 0;
var diffTime;

window.onload = function getLocation() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logPosition);
    } else {
        timeNotice.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function logPosition(position) {
    lat = position.coords.latitude
    lng = position.coords.longitude; 
    console.log(lat + " " + lng);
    sunSetTime();
    
}
function sunSetTime() {
    fetch('https://api.sunrise-sunset.org/json?lat='+ lat + '&lng=' + lng).then(response => response.json())
    .then(data => {
        console.log(data)
        x = data.results.sunset;
        console.log(x);
        difCal();
    }).catch((err) => console.log(err));
}

function difCal() {
    
    x = x.slice(0, -3);
    const colPos = x.indexOf(":");
    if (colPos < 2) {
        x = "" + 0 + x;
        var y = (x[0] + x[1])
        y = parseInt(y);
        y = y + 12;
        y = "" + y;
        x = x.slice(2, x.length);
        x = y + x;
    }
    
    
}
var timer = setInterval(function display() {
    var today = new Date().toString().split(" ").slice(0, 4).join(" ");
    var parsedDate = new Date(today + " " + x);
    var parsedDateTime = parsedDate.getTime();
    var todayDateTime = new Date().getTime();

    diffTime = parsedDateTime - todayDateTime;

    console.log(diffTime);
    if (diffTime <= 0) {
        
        timeNotice.innerHTML = "Sun has set, check back tomorrow"
        document.getElementById("wrap").style.backgroundColor = "#020203";
        document.getElementById("wrap").style.color = "#d8d8d8";
        document.getElementById("sun").style.top = 1000 +"px";
    }
    else {
        sunOffset += 5;
        var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
        timeNotice.innerHTML = hours + ":" + minutes + ":" + seconds;
        document.getElementById("sun").style.top = sunOffset +"px";
    }
}, 1000)




    