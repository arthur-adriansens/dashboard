const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
// all actions per day
const actions = {
    monday: {
        "studie uur": { start: [8, 15], end: [9, 15], classroom: "E01", teacher: "no teacher" },
        "frans": { start: [9, 16], end: [10, 16], classroom: "A15", teacher: "Sofie Hautekiet" },
        "godsdienst": { start: [10, 17], end: [11, 17], classroom: "B21", teacher: "Maria Gervoyse" },
        "nederlands": { start: [11, 18], end: [12, 19], classroom: "A13", teacher: "Tom Vandenbussche" },
        "middag": { start: [12, 20], end: [13, 20], classroom: "no classroom", teacher: "no teacher" },
        "geschiedenis": { start: [13, 21], end: [14, 21], classroom: "B11", teacher: "Thomas Bekaert" },
        "aardrijkskunde": { start: [14, 22], end: [15, 22], classroom: "B21", teacher: "Mart Grommen" }
    },
    tuesday: { start: "8u15" },
    wednesday: {
        "nederlands": { start: [8, 15], end: [9, 15], classroom: "D12", teacher: "Tom Vandenbussche" },
        "biologie": { start: [9, 16], end: [10, 16], classroom: "C02", teacher: "Loreto De Brabandere" },
        "wiskunde": { start: [10, 17], end: [11, 17], classroom: "D11", teacher: "Niko Verrecas" },
        "frans": { start: [11, 18], end: [12, 19], classroom: "A13", teacher: "Sofie Hautekiet" },
    },
    thursday: { start: "8u15" },
    friday: { start: "8u15" },
    saturday: { start: "8u15" },
    sunday: { start: "8u15" },
};

window.onload = function() {
    var time = getTime();
    //var time = ['wednesday', 9, 59];
    var action = getAction(time[0], time[1], time[2]);
    let currentAction = action[0];
    let nextAction = action[1];
    console.log("current action: "+currentAction);
    console.log("next action: "+nextAction);
};


function getAction(day, hour, minute) {
    document.getElementById("time").innerHTML = day + " " + hour + "u" + minute;
    // get todays actions
    var today = actions[day];
    var todayKeys = Object.keys(today);
    var todayValues = Object.values(today);
    var amount = todayKeys.length;
    
    // actions to times
    var starts = Array(), ends = Array();
    for (let i = 0; i < amount; i++) {
        starts.push(todayValues[i].start);
        ends.push(todayValues[i].end);
    }

    // no actions
    if (ends[amount-1][0] <= hour && ends[amount-1][1] <= minute) {
        document.getElementById("part2").innerHTML = "Momenteel heeft u geen activiteit.";
        return ["no action"];
    }
    // get result/currentAction
    var i = 0;
    var currentHour = starts[0][0], currentMinute = starts[0][1]; //earliest
    while (JSON.stringify([currentHour, currentMinute]) != JSON.stringify([hour, minute])) { 
        if (currentHour > starts[starts.length-1][0]) {break}
        if (currentMinute == 60) {
            currentMinute=0;
            currentHour+=1;
        }

        if (JSON.stringify(starts[i]) == JSON.stringify([currentHour, currentMinute])) { //https://stackoverflow.com/questions/30820611/why-doesnt-equality-check-work-with-arrays
            currentAction = todayKeys[i];
            nextAction = todayKeys[i+1];
            console.log(currentAction, starts[i], ends[i]);
            i+=1;
        }
        currentMinute+=1;
    }
    document.getElementById("current").innerHTML = currentAction;
    document.getElementById("next").innerHTML = nextAction;
    getInfo(currentAction, nextAction);
    return [currentAction, nextAction];
}

function getInfo(currentAction, nextAction) {
    var time = getTime();
    var current = actions[time[0]][currentAction]
    var next = actions[time[0]][nextAction];
    document.getElementById("part1").innerHTML = "U heeft " + Object.keys(actions[time[0]]).length + " activiteiten op " + time[0] + ".";
    document.getElementById("part2").innerHTML = "Momenteel heeft u " + currentAction + " van " + current.start[0]+"u"+current.start[1] + " tot " + current.end[0] + "u"+current.end[1] + " in lokaal " + current.classroom + " met " + current.teacher+".";
    document.getElementById("part3").innerHTML = "Daarna heeft u " + nextAction + " van " + next.start[0]+"u"+next.start[1] + " tot " + next.end[0]+"u"+next.end[1] + " in lokaal " + next.classroom + " met " + next.teacher + ".";
}

function getTime() {
    var date = new Date();
    if (date.getDay() === 0) {
        day = "sunday";
        nextDay = "monday";
    } else if (date.getDay() == 6) {
        day = "saturday"
        nextDay = "sunday";
    } else {
        day = days[date.getDay()];
        nextDay = days[date.getDay()+1];
    }
    return [day, date.getHours(), date.getMinutes(), nextDay];
}