/**
 * This function fetch data, calculates the cgpa and display it.
 * Make sure to supply CONFIGURATION file alongside before using the function.
 */
function showCGPA() {
    ignore = [];
    return fetch(config.ACAD_DATA_URL)
        .then((res) => res.json())
        .then((data) => {
            AIMSData = data;
            CURR_DATA = data;

            var processed = calculateFromData(data);
            updateData(
                processed.tableData,
                processed.cgpa,
                processed.totalCredits,
                processed.degreeCredits
            );
        });
}

var EVENT;
var ignore = [];

function courseSelectCustom(/** @type{InputEvent} */ e) {
    e.target.checked
        ? (ignore = ignore.filter((val) => val != e.target.id))
        : ignore.push(e.target.id);

    var processed = calculateFromData(AIMSData);
    updateData(
        processed.tableData,
        processed.cgpa,
        processed.totalCredits,
        processed.degreeCredits
    );
}

function updateData(tableData, cgpa, totalCredits, degreeCredits) {
    $("#grade-table").html(tableData);
    $("#cgpa-container").text(
        `Your CGPA is : ${cgpa} | Graded Credits : ${totalCredits} | Total Credits: ${degreeCredits}`
    );
    $(".checkbox").click(courseSelectCustom);
}

function calculateFromData(data) {
    var cgpa = 0;
    var totalCredits = 0;
    var degreeCredits = 0;
    data.sort((a, b) => Number(b.hdrId) - Number(a.hdrId));
    data = data.filter((a) => ignore.indexOf(a.courseCd) == -1);

    var tableData = "";
    data.forEach((course, ind) => {
        let credit = parseInt(parseFloat(course.credits));

        if (ind && course.hdrId !== data[ind - 1].hdrId)
            tableData += `<tr><td>-</td></tr>`;

        tableData += tableRow(
            course.courseCd,
            course.courseName,
            credit,
            course.gradeDesc
        );

        degreeCredits += credit;

        if (
            redundantGrades.has(course.gradeDesc) &&
            !gradeMapper[course.gradeDesc]
        )
            return;
        if (course.gradeDesc == "") return;

        cgpa += parseInt(parseFloat(gradeMapper[course.gradeDesc])) * credit;

        totalCredits += credit;
    });

    cgpa = Math.round((cgpa / totalCredits) * 100) / 100;

    return {
        cgpa,
        tableData,
        totalCredits,
        degreeCredits,
    };
}
