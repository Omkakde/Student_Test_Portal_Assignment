import { question } from "readline-sync";


let studentList = [
    {
        roll_no: 101,
        name: "Abhishek",
        class: 5,
        gender: "Male",
        test_scores: [] 
    }
];






function displayMenu() {
    console.log(`**** Display Menu ****`);
    console.log(`1) Take a Test`);
    console.log(`2) Generate Result`);
    console.log(`3) View Result`);
    console.log(`4) Exit`);

    const userOption = question("Enter your option: ");

    switch (userOption) {
        case '1':
            takeTest();
            break;
        case '2':
            generateResult();
            break;
        case '3':
            viewResult();
            break;
        case '4':
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid option, please try again.");
            displayMenu();
    }
}





function takeTest() {
    console.log("Taking test...");
    const subjects = ["Math", "Science", "English"];
    let scores = [];

    
    for (let subject of subjects) {
        let score = Math.floor(Math.random() * 100); 

        scores.push({ subject, score });
    }

    // Save scores for the student
    studentList[0].test_scores = scores;
    console.log("Test scores recorded:", scores);
    displayMenu();
}







function generateResult() {
    console.log("Generating result...");

    const student = studentList[0];
    if (student.test_scores.length === 0) {
        console.log("No test scores available. Please take a test first.");
        return;
    }

   
    const totalMarks = student.test_scores.reduce((total, subject) => total + subject.score, 0);
    const percentage = (totalMarks / (student.test_scores.length * 100)) * 100;

    student.result = { totalMarks, percentage };
  

     console.log(`
            +---------------------+----------------+
            | Total Marks         |   Percentage   | 
            +---------------------+----------------+
            | ${totalMarks}                  |     ${percentage.toFixed(2)}%    |
            +---------------------+----------------+`);1
    displayMenu();
}





function viewResult() {
    console.log("Viewing result...");

    const student = studentList[0];
    if (!student.result) {
        console.log("Result not available. Please generate the result first.");
    } else {
        console.log(`
            +---------+--------------------+-------------+--------------+
            | Roll No |        Name        | Total Marks |  Percentage  |
            +---------+--------------------+-------------+--------------+
            | ${student.roll_no}     |     ${student.name}       |     ${student.result.totalMarks}      | ${student.result.percentage.toFixed(2)} %      |
            +---------+--------------------+-------------+--------------+`);
    }

    displayMenu();
}


displayMenu();
