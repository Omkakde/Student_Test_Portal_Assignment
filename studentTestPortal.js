import readline from 'readline-sync';

let studentList = [
    { rollNo: 101, name: "Om", class: 5, gender: "Male", testScores: [] }
];

function menu() {
    while (true) {
        console.log(`**** Menu ****\n\
        1) Take a Test \n\
        2) Generate Result \n\
        3) Display Result \n\
        4) Exit`);

        const choice = readline.question("Choose an option (1-4): ");

        switch (choice) {
            case '1':
                takeTest();
                break;
            case '2':
                generateResults();
                break;
            case '3':
                handleViewResult();
                break;
            case '4':
                console.log("Exiting the program. Goodbye!");
                return;
            default:
                console.log("Invalid option. Please try again.");
        }
    }
}





function takeTest() {
    console.log("Taking the test...");

    studentList.forEach(student => {
        student.testScores = [];
        student.testScores.push(
            { subject: "Math", marks: Math.floor(Math.random() * 101) },
            { subject: "Science", marks: Math.floor(Math.random() * 101) },
            { subject: "English", marks: Math.floor(Math.random() * 101) }
        );
        student.testScores.forEach(score => {
            console.log(`${score.subject}: ${score.marks}`);
        });
    });

    console.log("Test completed!");
}







function generateResults() {
    console.log("Calculating results...");

    studentList.forEach(student => {
        const total = student.testScores.reduce((acc, score) => acc + (score.marks || 0), 0);
        student.totalMarks = total;
        student.averageScore = (total / student.testScores.length).toFixed(2);

        console.log(`Student: ${student.name}`);
        console.log(`Total Marks: ${student.totalMarks}`);
        console.log(`Average Score: ${student.averageScore}%\n`);
    });

    console.log("Results generated!");
}






function handleViewResult() {
    console.log("Viewing result...");
    
    studentList.forEach(student => {
        console.log(`\nStudent Information:
+------+--------------------+----------------+--------+
| Roll |        Name        |      Class     | Gender |
+------+--------------------+----------------+--------+
| ${student.rollNo}  |  ${student.name.padEnd(18)}| ${student.class.toString().padEnd(14)} | ${student.gender.padEnd(6)} |
+------+--------------------+----------------+--------+`);

        console.log(`\nTest Scores:
+--------------------+-------+
| Subject            | Marks |
+--------------------+-------+`);

        student.testScores.forEach(score => {
            console.log(`| ${score.subject.padEnd(18)} | ${score.marks.toString().padStart(5)} |`);
        });

        console.log(`+--------------------+-------+`);
        console.log(`Total Marks: ${student.totalMarks}`);
        console.log(`Average Score: ${student.averageScore}\n`);
    });
}

menu();
