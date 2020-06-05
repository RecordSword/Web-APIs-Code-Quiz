const startButton = document.getElementById("start-btn");
const homeButton = document.getElementById("home-btn");
const highscoresButton = document.getElementById("highscores-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreMark = document.getElementById("scoreContainer");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
const quizTimerEl = document.getElementById("quizCountdown");

let shuffledQuestions, currentQuestionArray;

startButton.addEventListener("click", startGame);
answerButtonsElement.addEventListener("click", () => {
  currentQuestionArray++
  setNextQuestion();
})

function startGame() {
  startButton.classList.add("hide");
  homeButton.classList.remove("hide")
  shuffledQuestions = myQuestions.sort(() => Math.random() - .5);
  currentQuestionArray = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  setTime();
  startTimer();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionArray]);
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionArray + 1) {
  } else {
    homeButton.classList.remove("hide")
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

const myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: [
      { text: "Douglas Crockford", correct: false },
      { text: "Sheryl Sandberg", correct: false },
      { text: "Brendan Eich", correct: true },
      { text: "Superman", correct: false }

    ]
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: [
      { text: "Node.js", correct: false },
      { text: "TypeScript", correct: false },
      { text: "npm", correct: true },
      { text: "Karen from HR", correct: false }

    ]
  }, {
    question: "Which tool can you use to ensure code quality?",
    answers: [
      { text: "ESLint", correct: true },
      { text: "jQuery", correct: false },
      { text: "RequireJS", correct: false },
      { text: "I'm not a tool. You're a tool", correct: false },
    ]
  },
];

// function to update display of time
var currentTimeEl = document.getElementById("currentTime")
function renderTime() {
  currentTime.textContent = displayTime;
  console.log("currentTime")

}
// function to update display of time
function renderTime() {
  currentTime.textContent = displayTime;
}
// display 75 seconds (utilised when quiz starts)
function setTime() {
  displayTime = 75;
  renderTime();
}
// display 0 seconds in timer
function clearTime() {
  displayTime = 0;
  renderTime();
}
// function to countdown timer each second and update display 
function startTimer() {
  // create function to count down (runs every 1000 milliseconds)
  interval = setInterval(function () {
      // new variable to remove 1 from the current time displayed
      var now = currentTime.textContent - 1;
      // update current time display
      displayTime = now;
      renderTime();
      // if timer reaches 0 stop countdown 
      if (now == 0) {
          // stop timer
          clearInterval(interval);
          // bring the time displayed as final question answered to variable "final time"
          finalTime = displayTime;
          // stop displaying questions and display scoreboard submission form
          showScoreSubmission()
          // empty variables from last quiz
          endOfQuiz()
      }
  }, 1000);
}

function scoreRender() {
  scoreMark.style.display="block"
}

// function to store submitted initials and scores in local storage
function storeInfo() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}
// function to render information from local storage and pin in to high score list
function renderInfo() {
    // clear list each time (to reflect any higher scores) 
    highScoreList.innerHTML = "";
    // accessing string stored in local storage, turning it back into array
    var storedHighScore = JSON.parse(localStorage.getItem("highscores"));
    // sort array by the scores (high score becomes obj 0, 2nd highests obj 1)
    storedHighScore.sort(function (a, b) {
        return b.score - a.score;
    });
    // create for loop the length of high score array
    for (k = 0; k < highscores.length; k++) {
        // create list new element 
        li = document.createElement("li");
        // access appropriate objects in variable and constuct display text to show data
        var publishName = storedHighScore[k].name;
        var publishScore = storedHighScore[k].score;
        var publishingTExt = (publishName + " - -  " + publishScore);
        // set the text element of list to publishing text var
        li.textContent = publishingTExt;
        // set an attribute to the list item equal to current k value
        li.setAttribute("data-index", k);
        // append li item to ordered list of highscores 
        highScoreList.appendChild(li);
    }
    // display highscore page
    showHS();
}
// function to clear local storage, clear high score array and render to clear list of high scores 
function emptyHS() {
    localStorage.clear();
    highscores = [];
    renderInfo();
}

// add event listener to submit button for highscore form
submitDataButton.addEventListener("click", function (event) {
    event.preventDefault();
    // create variable for submitted initials 
    var HSText = submittedInitials.value.trim();
    // create variable for score from final time
    var score = finalTime;
    var q = 0
    // if no initials entered, ________________________________
    if (HSText === "") {
        return;
    }
    // create object to store name and score
    var highscoresObject = {};
    highscoresObject.name = HSText;
    highscoresObject.score = score;
    console.log(highscoresObject)
    // push the object onto array called highscores
    highscores.push(highscoresObject);
    // empty initials for any future submissions
    HSText.value = "";
    submittedInitials.value = "";
    // empty form after data saved
    storeInfo();
    renderInfo();
});
// add event listener to clear high score button
clearHighScoresButton.addEventListener("click", emptyHS);