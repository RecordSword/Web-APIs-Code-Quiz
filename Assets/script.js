//Quiz questions and correct answers     
var questions = [
    {
        title: "What Guitar manufacturer has the model Les Paul?",
        choices: ["Fender", "Paul Reed Smith", "Gibson", "Ibanez"],
        answer: "Gibson"
    },
    {
        title: "Elvis Presley's home has been called?",
        choices: ["Faceland", "Braceland", "Traceland", "Graceland"],
        answer: "Graceland"
    },
    {
        title: "The Super Mario Theme song was created for Super Mario Bros. in what year?",
        choices: ["1984", "1985", "1986", "1987"],
        answer: "1985"
    },
    {
        title: "Final Fantasy 7 was a story about a mercenary called...",
        choices: ["Star Forcer", "Cloud Strife", "Sky Brace", "Trainer Sky"],
        answer: "Cloud Strife"
    },
    {
        title: "The Dreamcast is owned by which company?",
        choices: ["Sega", "Sony", "Microsoft", "Nintendo"],
        answer: "Sega"
    },
    {
        title: "In the original movie project 'Star Wars', the main charactor's name was origionally going to be...",
        choices: ["Luke Skywalker", "Luke Starkiller", "Fluke Farlicker", "Luke Tarlarker"],
        answer: "Luke Starkiller"
    },
    {
        title: "How far would I go?",
        choices: ["500 miles", "500 more", "1,000 miles", "At your door..."],
        answer: "1,000 miles"
    },
    {
        title: "Pure water is what pH Level?",
        choices: ["7pH", "8pH", "9pH", "10pH"],
        answer: "7pH"
    },
    {
        title: "How many bones do Sharks have in their bodies?",
        choices: ["20", "200", "2,000", "None"],
        answer: "None"
    },
    {
        title: "Karijini is a national park based in which Australian State",
        choices: ["Queensland", "Western Australia", "Northern Terretory", "New South Wales"],
        answer: "Western Australia"
    }
];


// Variables of elements on page
var choicesContent = document.querySelector("#choices-menu");
var startMenu = document.getElementById('start-menu');
var questionHeading = document.getElementById('heading1');
var gameClock = document.getElementById('quizCountdown');
var enterInitialsMenu = document.getElementById('enter-initials-menu');
var enterInitialsBtn = document.getElementById('submit-intials-btn');
var scoresMenu = document.getElementById('scores-menu');
var clearScoresBtn = document.getElementById('clear-btn');
var backToStartLink = document.getElementById('back-to-start-link');
var viewHighScoresLink = document.getElementById('highscores-btn');

var questionNumber = 0;

var numberOfQuestions = questions.length;
var questionChoices = questions[questionNumber].choices;

// 10 seconds for each question to determine total game time
var gameTimer = numberOfQuestions * 10;

var finalScore;
var highScores = [];

renderHighScores()

function renderHighScores() {
    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    var objectScores = JSON.parse(savedHighScores);
    highScores = objectScores;

}


// Function for when user clicks the start button
function startQuiz() {

    // Hide the default start menu
    startMenu.setAttribute("style", "display: none;");
    scoresMenu.setAttribute("style", "display: none;");
    scoresMenu.setAttribute("style", "display: none;");
    choicesContent.setAttribute("style", "display: block");
    enterInitialsMenu.setAttribute("style", "display: none;");
    choicesContent.innerHTML = " ";
    viewHighScoresLink.setAttribute("style", "display: none;");
    clearScoresBtn.setAttribute("style", "display: none;");


    // Start countdown clock
    gameClock.setAttribute("style", "display: block")
    countdownClock();

    // Place first question in h1 and create buttons
    questionHeading.textContent = questions[questionNumber].title;
    listChoices();

}

function listChoices() {
    // Loop through the available choices
    for (var i = 0; i < questionChoices.length; i++) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "btn btn-dark btn-sm d-block my-2 choice-btn");
        choiceBtn.setAttribute("id", "choice-" + i);
        choiceBtn.textContent = questions[questionNumber].choices[i];
        choicesContent.appendChild(choiceBtn);

    }
}
// Correct Answer
function correctAnswer() {
    var correctNotify = document.createElement("div");
    correctNotify.setAttribute("class", "border-top mt-3 pt-3")
    correctNotify.setAttribute("style", "font-size: 12px; color: green; font-weight: bold;");
    correctNotify.textContent = "You got the answer right!";
    choicesContent.appendChild(correctNotify);
}

// Wrong Answer
function incorrectAnswer() {
    var incorrectNotify = document.createElement("div");
    incorrectNotify.setAttribute("class", "border-top mt-3 pt-3"); incorrectNotify.setAttribute("style", "font-size: 12px; color: red; font-weight: bold;");
    incorrectNotify.textContent = "You got the answer wrong!";
    choicesContent.appendChild(incorrectNotify);
}

// The timer that counts down
function countdownClock() {
    var timerInterval = setInterval(function () {
        gameClock.textContent = gameTimer;
        gameTimer--;

        if (gameTimer <= 0) {
            clearInterval(timerInterval);
            gameClock.textContent = "0";
            choicesContent.innerHTML = " ";
            questionNumber = 0;
            choicesContent.setAttribute("display", "none");
            startMenu.setAttribute("style", "display: block;");
            questionHeading.textContent = "Your score is: " + gameTimer;
            gameTimer = numberOfQuestions * 10;
        }
        else if (questionNumber === 10) {
            clearInterval(timerInterval);
            questionNumber = 0;
            gameTimer = numberOfQuestions * 10;
        }

    }, 1000);
}

document.addEventListener("click", function (event) {
    if (event.target.matches('.choice-btn')) {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.textContent === questions[questionNumber].answer) {

            questionNumber = questionNumber + 1;
            gameTimer += 5;

            if (questionNumber <= (numberOfQuestions - 1)) {
                questionHeading.textContent = questions[questionNumber].title;
                choicesContent.innerHTML = " ";
                listChoices();
                correctAnswer();
            } else {
                choicesContent.innerHTML = " ";
                correctAnswer();
                enterInitialsMenu.setAttribute("style", "display: block;");
                startMenu.setAttribute("style", "display: block;");
                viewHighScoresLink.setAttribute("style", "display: inline;");
                clearScoresBtn.setAttribute("style", "display: none;");
                questionHeading.textContent = "Your score is: " + gameTimer;
                finalScore = gameTimer;
            }
        }
        // Condition if user selects wrong answer
        else if (event.target.textContent !== questions[questionNumber].answer) {

            // Move on to the next question
            questionNumber = questionNumber + 1;
            // Remove time from the clock
            gameTimer -= 10;

            if (questionNumber <= (numberOfQuestions - 1)) {
                questionHeading.textContent = questions[questionNumber].title;
                choicesContent.innerHTML = " ";
                listChoices();
                incorrectAnswer();
            } else {
                choicesContent.innerHTML = " ";
                incorrectAnswer();
                enterInitialsMenu.setAttribute("style", "display: block;");
                startMenu.setAttribute("style", "display: block;");
                viewHighScoresLink.setAttribute("style", "display: inline;");
                questionHeading.textContent = "Your score is: " + gameTimer;
                finalScore = gameTimer;
            }


        }
    }
});


function enterInitials(event) {
    event.preventDefault();
    // Take the value the user enters into the input after game ends
    var userInitials = document.getElementById('initials-input').value;

    // Object containing the user initials and final score
    var userScores = {
        initials: userInitials,
        score: finalScore
    };

    // Push the above object into the high scores array
    highScores.push(userScores);
    // console.log(highScores);

    // Convert the object into a string
    var highScoresString = JSON.stringify(highScores);

    // Store the string into the user's local storage
    window.localStorage.setItem("high scores", highScoresString);

    // Inform user their score is now entered
    questionHeading.textContent = "You have entered your score. Play again?";
    enterInitialsMenu.setAttribute("style", "display: none;");
    choicesContent.innerHTML = " ";

}

// Go back to start Menu
function goBackToStart() {
    backToStartLink.setAttribute("style", "display: none;")
    viewHighScoresLink.setAttribute("style", "display: inline;")
    clearScoresBtn.setAttribute("style", "display: inline;")
    startMenu.setAttribute("style", "display: block;");
    scoresMenu.setAttribute("style", "display: none;");
    choicesContent.setAttribute("style", "display: none");
    enterInitialsMenu.setAttribute("style", "display: none;");
    questionHeading.textContent = "Coding Quiz Challenge";
}

enterInitialsBtn.addEventListener("click", enterInitials);

function viewHighScores() {
    scoresMenu.innerHTML = " ";
    startMenu.setAttribute("style", "display: none;");
    scoresMenu.setAttribute("style", "display: block;");
    choicesContent.setAttribute("style", "display: none");
    enterInitialsMenu.setAttribute("style", "display: none;");
    questionHeading.textContent = "View High Scores";
    backToStartLink.setAttribute("style", "display: inline;");
    viewHighScoresLink.setAttribute("style", "display: none;");
    clearScoresBtn.setAttribute("style", "display: inline;");


    var highScoreList = window.localStorage.getItem("high scores");

    var highScoreObject = JSON.parse(highScoreList);

    highScoreObject.sort(highestToLowest);

    for (var i = 0; i <= highScores.length - 1; i++) {
        var highScoreEntry = document.createElement("div");
        highScoreEntry.setAttribute("class", "alert alert-warning");
        highScoreEntry.innerHTML = "<span style='font-weight: bold;''>" + highScoreObject[i].initials + ":</span> " + highScoreObject[i].score;
        scoresMenu.appendChild(highScoreEntry);

    }
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Function to sort the objects in the array
// by highest score to lowest
function highestToLowest(x, y) {
    var scoreX = x.score;
    var scoreY = y.score;

    var comparison = 0;
    if (scoreX > scoreY) {
        comparison = 1;
    } else if (scoreX < scoreY) {
        comparison = -1;
    }
    return comparison * -1;
}