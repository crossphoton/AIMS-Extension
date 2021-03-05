const DEV_EMAIL = "codesoc@iiitr.ac.in";
DOMAIN = "iiitr.ac.in";

const BASE_URL = "https://aims.iiitr.ac.in/iiitraichur";
const USER_URL = BASE_URL + "/valueSet/getTableData/30";
const ACAD_DATA_URL =
    BASE_URL +
    "/courseReg/loadMyCoursesHistroy?studentId=&courseCd=&courseName=&orderBy=1&degreeIds=&acadPeriodIds=&regTypeIds=&gradeIds=&resultIds=&isGradeIds=";

const REMOTE_SERVER_URL = "https://iiitr.herokuapp.com";
const REMOTE_DATA_SYNC_URL = REMOTE_SERVER_URL + "/studentdata/updateData";
const REMOTE_LOGIN_URL = REMOTE_SERVER_URL + "/auth/google";

var USER;

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
    S: 0,
};

function tableRow(courseId, courseName, cgpa) {
    return `<tr>
                <td>${courseId}</td>
                <td>${courseName}</td>
                <td>${cgpa}</td>
            </tr>`;
}
