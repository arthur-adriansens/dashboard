var previousHour = getHour();
const clockModes = ["arrows", "digital"];
var clockMode = false;
//console.log(clockModes[clockMode ? 1:0]);

function startClocks() {
    time();
    changeDegree();
    setTimeout(startClocks, 1000);
}

function control(e) {
    if (e.key !== undefined) {
        colorClock();
    }
}

function time() {
    //place 0 before minutes smaller than 10
    let minutes = checkTime(getMinute());
    let hours = checkTime(getHour());
    let seconds = checkTime(getSecond());

    //in 24 hours
    var time24 = hours + ":" + minutes + ":" + seconds;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;

    //in 12 hours
    var time12 = tConvert(time24);
}

function getHour() {
    const today = new Date();
    let h = today.getHours();
    return h;
}

function getMinute() {
    const today = new Date();
    let m = today.getMinutes();
    return m;
}

function getSecond() {
    const today = new Date();
    let s = today.getSeconds();
    return s;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function tConvert(time) {
    // Check correct time format and split into parts
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}


function changeDegree() {
    //if your reading this, sorry for the mess :)
    var amountOfClocks = document.getElementsByClassName("rotateMinutes").length; //- 1 for testClocks
    var degreeMinutes = 720 + getMinute() * 6 - 45; //360° / 60 minuten = 6°/minuut
    for (let i = 0; i < amountOfClocks; i++) {
        const minutesElement = document.getElementsByClassName("rotateMinutes")[i];
        minutesElement.style.setProperty("--degreeMinutes", degreeMinutes + "deg");
    }

    var degreeHours = 720 + getHour() * 30 + 45; //360° / 12 uren = 30°/uur

    //koekoeksound
    /*if (previousHour != getMinute()) {
                    for (let i = 0; i < getHour(); i++) {

                        document.body.addEventListener("mousemove", function() {
                            audio.play()
                        })
                    }
                    previousHour = getMinute();
                }*/

    //extra hours
    var percentageDoneMinutes = (degreeMinutes / 360) * 100; //calculate how far minutes are
    var step1 = degreeMinutes - 720 + 45;
    var step2 = step1 / 360;
    var step3 = step2 * 100;

    extraHours = 30 * step2; //360° / 12stukken = 30°/stuk
    for (let i = 0; i < amountOfClocks; i++) {
        const hourElement = document.getElementsByClassName("rotateHours")[i];
        hourElement.style.setProperty("--degreeHours", degreeHours + extraHours + "deg");
    }

    var degreeSeconds = 720 + getSecond() * 6 - 45; //360° / 60 seconden = 6°/seconde
    for (let i = 0; i < amountOfClocks; i++) {
        const secondsElement = document.getElementsByClassName("rotateSeconds")[i];
        secondsElement.style.setProperty("--degreeSeconds", degreeSeconds + "deg");
    }
}

function colorClock(extraColor = "no") {
    var pastelCenter = document.getElementById('pastel');
    var pastelBorder = document.getElementById('pastelBorder');

    if (extraColor == "no") {
        let computed = getComputedStyle(pastelCenter);
        let colors = ["rgb(206, 240, 205)", "#B4E3CF", "#E5E1DE", "#C6E2B9", "#F9C4B4", "#F57F73", "#E48C8B", "#ACD47C", "#ABE1FB", "#FED229", "#89D4E7", "#929C9D", "#EF529F", "#EE4423", "#F7D0E2", "#7DA58A", "#F3F298", "#ABF0D1", "#99FB98", "#99DEDB", "#C2E6A6", "#B1FBA4", "#C9FFB1", "#77DD77", "#D7FFFE", "#00AD82", "#008001", "#008081", "#CA9BF7", "#D1B48C", "#EFBACC", "#0015BC", "#FFFD74", "#97CE94", "#AAABD7", "#7FC8CE", "#EFDB56", "#51C3C4", "#C2D94B", "#FEE4D3", "#83C65F", "#9BDAE3", "#C3C16C", "#DFBB5A", "#4BA896", "#FAB896", "#07A3AF", "#7DBEB6", "#F05E45"];
        var currentColor = String(computed.getPropertyValue("--color"));
        index = colors.indexOf(currentColor);

        if (index == colors.length - 1) {
            color = colors[0];
            console.log("end");
            reset();
        } else {
            color = colors[index + 1];
        }
        console.log("new color: " + color + "(index:" + index + ")");
    } else { color = extraColor }


    pastelCenter.style.setProperty("--color", color);
    pastelBorder.style.setProperty("--color", color);

}

function reset() {
    var pastelCenter = document.getElementById('pastel');
    var pastelBorder = document.getElementById('pastelBorder');

    pastelCenter.style.setProperty("--color", "rgb(206, 240, 205)");
    pastelBorder.style.setProperty("--color", "rgb(206, 240, 205)");
    console.clear();
}