/**
 * This function fetch data, calculates the cgpa and display it.
 *
 * Make sure to supply CONFIGURATION file alongside before using the function.
 */
function showCGPA() {
    fetch(config.ACAD_DATA_URL)
        .then((res) => res.json())
        .then((data) => {
            AIMSData = data;
            var cgpa = 0;
            var totalCredits = 0;
            var degreeCredits = 0;
            data.sort((a, b) => Number(b.hdrId) - Number(a.hdrId));

            var tableData = "";
            data.forEach((course, ind) => {
                if (course.gradeDesc == "") return;
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

                cgpa +=
                    parseInt(parseFloat(gradeMapper[course.gradeDesc])) *
                    credit;

                totalCredits += credit;
            });

            cgpa = Math.round((cgpa / totalCredits) * 100) / 100;

            $("#grade-table").html(tableData);
            $("#cgpa-container").text(
                `Your CGPA is : ${cgpa} | Graded Credits : ${totalCredits} | Total Credits: ${degreeCredits}`
            );
        });
}
