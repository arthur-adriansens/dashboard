/** @format */

const root = document.querySelector(":root");
const center = document.getElementById("center");
const cloneDiv = document.getElementsByClassName("circlePiece")[0];
const cloneParent = document.getElementsByClassName("outerCircle")[0];
const arrows = document.getElementById("arrows");
const digitaal = document.getElementById("digital");
var arrowsY = 0;

const functions = [
    ["timer & stopwatch", "icon relative url ..."],
    ["school & calculator", "icon relative url ..."],
    ["chat & notes", "icon relative url ..."],
    ["file dropoff", "icon relative url ..."],
    ["(YouTube) downloads", "icon relative url ..."],
    ["(SS & Gmail) mails", "icon relative url ..."],
    ["Raspberry Pi", "icon relative url ..."],
];
cloneDiv.dataset.function = functions[0][0];
const pieces = functions.length;

root.style.setProperty("--pieceAngle", 90 - 360 / pieces + "deg"); //300=outercircleSize=r
for (let i = 1; i < pieces; i++) {
    //!!! overlapping other ones
    clone = cloneDiv.cloneNode();
    clone.dataset.function = i < functions.length ? functions[i][0] : "";

    //rotate (& skew)
    clone.style.setProperty("--rotate", `${(360 / pieces) * i}deg`);
    clone.style = `animation: rotate 1.8s cubic-bezier(0.65, 0.05, 0.36, 1) 0s 1 normal none; transform: rotate(${
        (360 / pieces) * i
    }deg) skew(var(--pieceAngle));` /*rotate(${360/pieces*i}deg)  animation: fadeIn 1s ease ${0.075*i}s 1 normal forwards;*/;

    //append to parent div
    cloneParent.appendChild(clone);
    lastClone = clone;
}

document.querySelector("#fullscreen").onclick = () => {
    if (document.fullscreen) {
        document.exitFullscreen();
        document.querySelector("#fullscreen").src = "icons/fullScreen.svg";
    } else {
        document.documentElement.requestFullscreen();
        document.querySelector("#fullscreen").src = "icons/fullScreen_exit.svg";
    }
};

// refresh icon
function reload() {
    document.querySelector("#refresh").removeEventListener("transitionend", reload);
    location.reload();
}

document.querySelector("#refresh").onclick = (e) => {
    let image = e.target;
    image.style.transition = "rotate 1s";
    image.style.rotate = "360deg";
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "0%";

    document.querySelector("#refresh").addEventListener("transitionend", reload);
};

// toggle center clock
center.ondblclick = (event) => {
    if (!clockMode) {
        arrows.classList.add("switchClock1");
        digitaal.classList.add("switchClock2");

        arrows.classList.remove("switchClock3");
        digitaal.classList.remove("switchClock4");
        clockMode = !clockMode;
    } else {
        arrows.classList.add("switchClock3");
        digitaal.classList.add("switchClock4");

        arrows.classList.remove("switchClock1");
        digitaal.classList.remove("switchClock2");
        clockMode = !clockMode;
    }
};

checkStatus();
