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

            var tableData = "";
            data.forEach((course) => {
                if (course.gradeDesc == "") return;

                tableData += tableRow(
                    course.courseCd,
                    course.courseName,
                    course.gradeDesc
                );

                let credit = parseInt(parseFloat(course.credits));
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
            $("#cgpa-container").text(`Your CGPA is : ${cgpa} | Graded Credits : ${totalCredits} | Total Credits: ${degreeCredits}`);
        });
}
