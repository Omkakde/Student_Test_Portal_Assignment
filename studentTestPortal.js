
import readline from 'readline-sync';

let studentList = [
    { rollNo: 101, name: "Om  ", class: 5, gender: "Male", testScores: [], totalMarks: 0, percentages: 0 },
    { rollNo: 102, name: "Sara", class: 5, gender: "Female", testScores: [], totalMarks: 0, percentages: 0 },
    { rollNo: 103, name: "Raj ", class: 6, gender: "Male", testScores: [], totalMarks: 0, percentages: 0 },
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
        6) View Top Performer \n\
        7) Exit`); 

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
                viewTopPerformers();
                break;
            case '7':
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
            { subject: "Math   ", marks: Math.floor(Math.random() * 101) },
            { subject: "Science", marks: Math.floor(Math.random() * 101) },
            { subject: "English", marks: Math.floor(Math.random() * 101) }
        ];
        console.log("=========================================================");
        console.log(student.name);
        student.testScores.forEach(score => {            
            console.log(`              
                +---------+-------------+
                | Subject |  Marks      |
                +---------+-------------+\n\
                |  ${score.subject} |  ${score.marks}        |`);
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


        console.log(`\n
            +---------+-------------+------------+
            | Student |  totalMark  | percentage |
            +---------+-------------+------------+\n\
            |    ${student.name}   |     ${student.totalMarks}    | ${student.percentages.toFixed(2)}%    |`);
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
| ${student.rollNo}  |  ${student.name}              |   ${student.class}           |    ${student.gender} |
+------+--------------------+----------------+--------+`);

        console.log(`\nTest Scores:
+--------------------+---------+
| Subject            | Marks   |
+--------------------+---------+`);

        student.testScores.forEach(score => {
            console.log(`| ${score.subject}            | ${score.marks.toString()}      |`);
        });

        console.log(`+--------------------+-------+`);
        console.log(`Total Marks: ${student.totalMarks}`);
        console.log(`Percentage: ${student.percentages.toFixed(2)}%\n`);
        console.log("=============================================================================")
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
                +------+--------------------+----------------+
                | Name |    Total Marks     |    Percentage  |
                +------+--------------------+----------------+
                | ${student.name} |    ${total}             | ${percentage.toFixed(2)}%         |
                +------+--------------------+----------------+`); 
                console.log("=============================================================================");               
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
function viewTopPerformers() {
    console.log("**** Classwise Top Performers ****");

    const classMap = {};

    studentList.forEach(student => {
        if (!classMap[student.class]) {
            classMap[student.class] = [];
        }
        classMap[student.class].push(student);
    });

    for (let cls in classMap) {
        let studentsInClass = classMap[cls];

        for (let i = 0; i < studentsInClass.length - 1; i++) {
            for (let j = 0; j < studentsInClass.length - 1 - i; j++) {
                if (studentsInClass[j].totalMarks < studentsInClass[j + 1].totalMarks) {
                    let temp = studentsInClass[j];
                    studentsInClass[j] = studentsInClass[j + 1];
                    studentsInClass[j + 1] = temp;
                }
            }
        }

        let topPerformers = studentsInClass.slice(0, 3);

        console.log("==================================================================")
        console.log(`\nClass ${cls} Top Performers:`);
        topPerformers.forEach((student, index) => {
            console.log(`\n
                +--------+-------------+-------+
                | Rank   |    Name     | Marks |
                +--------+-------------+-------+\n\
                |    ${index + 1}   |  ${student.name}        | ${student.totalMarks}   |`);                       
                
        });
    }
}



menu()
