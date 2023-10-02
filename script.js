
const submitBtn = document.getElementById('submit')
const nextBtn = document.getElementById('next')
const restartBtn = document.getElementById('restart')
const questionContainer = document.getElementById("question-container")
const completionContainer = document.getElementById("completion-container")
const questionText = document.getElementById("question")
const displayAnswerContainer = document.getElementById("display-answer")
const answersContainer = document.getElementById('answer-options')
const options = document.getElementsByName('options')
const timer = document.getElementById("timer")
var timerInterval
const defaultTime = 30
var remainingTime = defaultTime

var correctAnswerContainer
document.onload = setTimeout(startGame, 1000)
submitBtn.addEventListener('click', checkAnswer)
nextBtn.addEventListener('click', setNextQuestion)
restartBtn.addEventListener('click', restartGame)

questionContainer.addEventListener('change', displaySelectedAnswer)
const questions = [
    {question: "What is the best-selling video game of all time?", correctAnswer: "Minecraft", options: ["Minecraft", "Call of Duty","PUBG", "GTA V"]}, 
    {question: "What is the highest-grossing video game franchise?", correctAnswer: "Pokémon", options: ["Super Mario", "GTA","Pokémon", "Assassin's Creed"]},
    {question: "What was the first video game to be adapted into a movie?", correctAnswer: "Super Mario Bros", options: ["Mortal Kombat", "Super Mario Bros","Doom", "Resident Evil"]},
    {question: "What is a correct syntax to output 'Hello World' in C#?", correctAnswer: 'Console.WriteLine("Hello World");' , options: ['cout << "Hello World";', 'print("Hello World");','Console.WriteLine("Hello World");', "None of the above"]},
    {question: "Which of the following is a JavaScript framework?", correctAnswer: "ReactJS", options: ["ReactJS", "Django","Flask", "All of the above"]},
    {question: "Which of the following is a way to handle data in React.js?", correctAnswer: "State & Props", options: ["Services & Component", "State & Component","State & Services", "State & Props"]},
]
var currentQuestion = 0
var score = 0

function startGame(){
    questionContainer.classList.remove("hide")
    displayNextQuestion(questions[0])
}
function resetState() {
    displayAnswerContainer.classList = ""
    displayAnswerContainer.innerHTML = ""
    const selectedAnswerContainer = getSelectedAnswer()
    selectedAnswerContainer && selectedAnswerContainer.parentElement.classList.remove("red")
    questionText.removeChild(questionText.firstChild)
    while(answersContainer.firstChild){
        answersContainer.removeChild(answersContainer.firstChild)
    }
    correctAnswerContainer.classList.remove("green")
    submitBtn.classList.remove("hide")
    submitBtn.disabled = true
    nextBtn.classList.add("hide")
    timer.innerText = defaultTime
    timer.classList.remove("incorrect")
    remainingTime = defaultTime
}
function setNextQuestion() {
    resetState()
    currentQuestion = currentQuestion + 1
    if(currentQuestion === questions.length - 1){
        nextBtn.textContent = "Finish Quiz"
    }else{
        nextBtn.textContent = "Next"
    }
    if(currentQuestion === questions.length){
        displayScore()
    }else{
        displayNextQuestion(questions[currentQuestion])
    }
}

function displayNextQuestion(question){
    console.log(question)
    var p = document.createElement("p")
    qsNumber = currentQuestion + 1
    p.innerText =  "Q: " + question.question
    timer.innerText = defaultTime + 's'
    questionText.appendChild(p)
    const progressBar = document.getElementById("progress-bar")
    const progressText = document.getElementById("progress-text")
    progressBar.style.setProperty('--width', `${(qsNumber / questions.length )* 100}%`)
    progressText.innerText = qsNumber + " / " + questions.length
    question.options.forEach(option => {
        var optionDiv = document.createElement("div")
        optionDiv.className = "option-container"
        var radioInputTag = document.createElement("input")
        var labelTag = document.createElement("label")
        radioInputTag.type = "radio"
        radioInputTag.id = option
        radioInputTag.value = option
        radioInputTag.name = "options"
        labelTag.for = option
        labelTag.innerText = option
        optionDiv.appendChild(radioInputTag)
        optionDiv.appendChild(labelTag)
        answersContainer.appendChild(optionDiv)
    });
    correctAnswerContainer = document.getElementById(questions[currentQuestion].correctAnswer).parentElement
    setTimeout(startTimer, 1300)
}
function startTimer() {
        timerInterval = setInterval(() => {
        remainingTime = remainingTime - 1
        timer.innerText = remainingTime + "s"
        if(remainingTime < 15){
            timer.classList.add("incorrect")
        }
        if(remainingTime === 0){
            stopTimer(timerInterval)
            checkAnswer()
        }
    },1000)
}
function stopTimer(){
    clearInterval(timerInterval)
}
function getSelectedAnswer() {
    
    var selectedAnswer
    for(let i=0; i<options.length; i++){
        if(options[i].checked){
            selectedAnswer = options[i]
        }
    }
    submitBtn.disabled = false
    return selectedAnswer
}
function displaySelectedAnswer() {
    displayAnswerContainer.innerHTML = "Selected answer = " + getSelectedAnswer().value
}

function checkAnswer() {
    var result = false
    stopTimer()
    options.forEach(radioBtn => {
        radioBtn.disabled = true
    });
    const selectedAnswer = getSelectedAnswer()
    if(selectedAnswer){
        if(selectedAnswer.value === questions[currentQuestion].correctAnswer){
            result = true
            score = score + 1
        }else{
            selectedAnswer.parentElement.classList.add("red")
        }
        correctAnswerContainer.classList.add("green")
        displayAnswerContainer.classList = result ? "correct" :"incorrect"
        displayAnswerContainer.innerHTML = result ? "Your answer is correct!!" : "Your answer is incorrect"
    }else{
        displayAnswerContainer.innerHTML = "You did not select an answer"
        displayAnswerContainer.classList = "incorrect"
    }
    submitBtn.classList.add("hide")
    nextBtn.classList.remove("hide")
}

function displayScore() {
    questionContainer.classList.add("hide")
    completionContainer.classList.remove("hide")
    var heading = document.createElement("h2")
    var scoreText = document.createElement("p")
    heading.innerText = "You've completed the test!"
    scoreText.innerText = "You scored: " + score + " / " + questions.length
    completionContainer.appendChild(scoreText)
    completionContainer.appendChild(heading)
}

function restartGame() {
    endGame()
    startGame()
}
function endGame() {
    score = 0
    currentQuestion = 0
    for(let i=0;i<2; i++){
        completionContainer.removeChild(completionContainer.lastChild)
    }
    completionContainer.classList.add('hide')
}
