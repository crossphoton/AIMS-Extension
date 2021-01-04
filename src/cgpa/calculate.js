function showCGPA() {
    fetch(ACAD_DATA_URL)
        .then((res) => res.json())
        .then((data) => {
            var cgpa = 0;
            var totalCredits = 0;

            var tableData = "";
            data.forEach((course) => {
                if (course.gradeDesc == "") return;

                tableData += tableRow(
                    course.courseCd,
                    course.courseName,
                    course.gradeDesc
                );

                if (course.gradeDesc == "S") return;

                let credit = parseInt(parseFloat(course.credits));
                cgpa +=
                    parseInt(parseFloat(gradeMapper[course.gradeDesc])) *
                    credit;

                totalCredits += credit;
            });

            cgpa = Math.round((cgpa / totalCredits) * 100) / 100;

            $("#grade-table").html(tableData);
            $("#cgpa-container").text(`Your CGPA is : ${cgpa}`);
        });
}
