import {question} from "readline-sync"

let studentList = [
    {
        roll_no: 101,
        name: "Abhishek",
        class: 5,
        gender: "Male",
        test_score: [] 
    }
]


function displayMenu() {
    console.log(`****Display Menu****\n
        1) Take a Test \n
        2) Generate Result \n
        3) View Result
        4) Exit`);
        
        const userIp = question("Enter ur option")

        // userIp == 1 ? handleTakeTest : handleViewResult()
        
        // userIp == 1 ? handleTakeTest() : userIp == 2 
        //     ? handleGenerateResult() : userIp == 3 
        //     ? handleViewResult() : console.log("Wrong Input")

        if (userIp == 1) {
            handleTakeTest()
        } else if (userIp == 2) {
            handleGenerateResult()
        } else if (userIp == 3) {
            handleViewResult
        } else if (userIp == 4) {
            return
        } 
        else {
            console.log("wrong input");
            displayMenu()
        }
    }

displayMenu()

function handleTakeTest () {
    console.log("Take test");
    displayMenu()
}

function handleGenerateResult () {
    console.log("Take test");
}

function handleViewResult () {
    console.log("Take test");
}