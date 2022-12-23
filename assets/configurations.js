const DEV_EMAIL = "codesoc@iiitr.ac.in";
const DOMAIN = "iiitr.ac.in";
const CONFIG_URL =
    "https://crossphoton.github.io/AIMS-Extension/assets/config.json";
var config;

var USER;

// Checking configuration
fetch(CONFIG_URL)
    .then((res) => res.json())
    .then((data) => (config = data))
    .catch((err) =>
        fetch("/assets/config.json")
            .then((res) => res.json())
            .then((data) => (config = data))
    );

class NotificationsConfig {
    iconUrl = "/assets/icon.png";
    type = "basic";
    isClickable = true;
    priority = 2;
    requireInteraction = true;
    constructor(title, message) {
        this.title = title;
        this.message = message;
    }
}

var gradeMapper = {
    "A+": 10,
    A: 10,
    "A-": 9,
    B: 8,
    "B-": 7,
    C: 6,
    "C-": 5,
    D: 4,
    AU: 0,
    FS: 0,
    FR: 0,
};

var redundantGrades = new Set(["S", "I", "U"]);

function tableRow(courseId, courseName, credits, cgpa) {
    return `<tr>
                <td>
                    <input type="checkbox" checked class="checkbox" id="${courseId}">
                </td>
                <td>${courseId}</td>
                <td>${courseName}</td>
                <td>${credits} | ${cgpa}</td>
            </tr>`;
}

var LOADING = false;
function toggleLoading() {
    LOADING = !LOADING;
    LOADING ? $.LoadingOverlay("show") : $.LoadingOverlay("hide");
}
