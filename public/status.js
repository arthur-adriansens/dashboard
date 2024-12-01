/** @format */

//check status (starts from end of script.js)
// https://stackoverflow.com/questions/189430/detect-if-the-internet-connection-is-offline

const client_status_div = document.getElementById("status");
const server_status_div = document.getElementById("server_status");

function check_server() {
    if (window.navigator.onLine) {
        let test;

        try {
            test = fetch("https://dashboard-eosin-rho.vercel.app/check_status");
        } catch (err) {
            server_status_div.innerHTML = "server offline";
        }

        test.then((res) => {
            return res?.text();
        }).then((body) => {
            if (body == "connected") {
                server_status_div.innerHTML = "server online";
            } else {
                server_status_div.innerHTML = "server offline";
            }
        });
    } else {
        server_status_div.innerHTML = "server status unknown";
    }
}

function checkStatus() {
    client_status_div.innerHTML = window.navigator.onLine ? "connected" : "not connected";
}

checkStatus();
check_server();
window.addEventListener("online", checkStatus);
window.addEventListener("offline", checkStatus);