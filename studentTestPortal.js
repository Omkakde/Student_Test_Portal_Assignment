import readline from 'readline-sync';

let studentList = [
    { rollNo: 101, name: "Om", class: 5, gender: "Male", testScores: [], totalMarks: 0, percentages: 0 },
    { rollNo: 102, name: "Sara", class: 5, gender: "Female", testScores: [], totalMarks: 0, percentages: 0 },
    { rollNo: 103, name: "Raj", class: 6, gender: "Male", testScores: [], totalMarks: 0, percentages: 0 },
    { rollNo: 104, name: "Nina", class: 6, gender: "Female", testScores: [], totalMarks: 0, percentages: 0 }
];

function menu() {
    while (true) {
        console.log(`**** Menu ****\n\
        1) Take a Test \n\
        2) Generate Result \n\
        3) Display Result \n\
        4) View Classwise Result \n\
        5) Detail Analysis of Result\n\
        6) Exit`); 

        const choice = readline.question("Choose an option (1-5): ");

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
                handleClassResult();
                break;
            case '5':
                detailedAnalysis();
                break;
            case '6':
                console.log("Exiting the program. Goodbye!");
                return;
            default:
                console.log("Invalid option. Please try again.");
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////

function takeTest() {
    console.log("Taking the test...");

    studentList.forEach(student => {
        student.testScores = [
            { subject: "Math", marks: Math.floor(Math.random() * 101) },
            { subject: "Science", marks: Math.floor(Math.random() * 101) },
            { subject: "English", marks: Math.floor(Math.random() * 101) }
        ];
        student.testScores.forEach(score => {
            console.log(`${score.subject}: ${score.marks}`);
        });
    });

    console.log("Test completed!");
}


///////////////////////////////////////////////////////////////////////////////////////

function generateResults() {
    console.log("Calculating results...");

    studentList.forEach(student => {
        const total = student.testScores.reduce((acc, score) => acc + (score.marks || 0), 0);
        student.totalMarks = total; 
        student.percentages = (total / (student.testScores.length * 100)) * 100; 

        console.log(`Student: ${student.name}`);
        console.log(`Total Marks: ${student.totalMarks}`);
        console.log(`Percentage: ${student.percentages.toFixed(2)}%\n`);
    });

    console.log("Results generated!");
}



///////////////////////////////////////////////////////////////////////////////////////////////////////

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
        console.log(`Percentage: ${student.percentages.toFixed(2)}%\n`);
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////////

function handleClassResult() {
    const classToView = parseInt(readline.question("Enter class: "));
    let totalMarks = 0;
    let studentCount = 0;

    studentList.forEach(student => {
        if (student.class === classToView) {
            studentCount++;
            const total = student.testScores.reduce((sum, score) => sum + (score.marks || 0), 0);
            totalMarks += total;

            const percentage = (total / (student.testScores.length * 100)) * 100; 

            console.log(`\nStudent Information:
+------+--------------------+----------------+--------+
| Name |    Total Marks     |    Percentage   |
+------+--------------------+----------------+--------+
| ${student.name.padEnd(18)} | ${total.toString().padEnd(16)} | ${percentage.toFixed(2)}% |
+------+--------------------+----------------+--------+`);
        }
    });   
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function detailedAnalysis() {
    console.log("***** Detailed Analysis of Results *****");

    const classMap = {};

    
    studentList.forEach(student => {
        if (!classMap[student.class]) {
            classMap[student.class] = { totalStudents: 0, totalMarks: 0, passed: 0, failed: 0 };
        }

        classMap[student.class].totalStudents++;
        classMap[student.class].totalMarks += student.totalMarks;
        student.percentages >= 40 ? classMap[student.class].passed++ : classMap[student.class].failed++;
    });


    console.log("Class | Total Students | Avg Marks | Avg % | Grade | Failed | Failed % | Passed | Passed %");

    for (let cls in classMap) {
        let data = classMap[cls];
        let avgMarks = (data.totalMarks / data.totalStudents).toFixed(2);
        let avgPercentage = ((data.totalMarks / (data.totalStudents * 300)) * 100).toFixed(2); 
        let grade = getGrade(avgPercentage);  
        let passPercent = ((data.passed / data.totalStudents) * 100).toFixed(2);
        let failPercent = ((data.failed / data.totalStudents) * 100).toFixed(2);

        console.log(`${cls}     | ${data.totalStudents}            | ${avgMarks}       | ${avgPercentage}%   | ${grade}   | ${data.failed}      | ${failPercent}%    | ${data.passed}      | ${passPercent}%`);
    }
}


function getGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 75) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';  
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////



menu();
