/*CONST*/
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const BONUS_POINTS = 10;
const MAX_QUESTIONS = 10;

/*LET*/
let questionCounter = 0;
let score = 0;
let shuffledQuestions, currentQuestionIndex

var currentlySelectedItem;
var currentlyRenderedItems;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	checkAnswer();
	currentQuestionIndex++
	setNextQuestion()
})

function checkAnswer()
{
	var isAnswerCorrect = false;
	var correctAnswer = '';

	for(var i = 0; i < currentlyRenderedItems.length;++i)
	{
		var isItemCorrect = currentlyRenderedItems[i].correct;

		if(isItemCorrect)
		{
			correctAnswer = currentlyRenderedItems[i].text;
			var isAnswerCorrect = correctAnswer == currentlySelectedItem;
			if(isAnswerCorrect)
			{
				incrementScore(BONUS_POINTS); 
				break;
			}
		}
	}
}

/*FUNCTIONS*/
function startGame() {
	console.log("Started!");
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0
	questionContainerElement.classList.remove('hide')
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
	questionCounter++;

	questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
	if (questionCounter == 10) {
		questionCounter = 0
		startGame();
		resetScore();
	}
}

function showQuestion(question) {
	questionElement.innerText = question.question
	currentlyRenderedItems = question.answers;
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}

function resetState() {
	clearStatusClass(document.body)
	nextButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	currentlySelectedItem = selectedButton.innerText;

	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})

	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	} else {
		startButton.innerText = 'Restart'
		startButton.classList.remove('hide')
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element)

	if (correct) {
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}

function incrementScore(num){
	score += num;
	scoreText.innerText = score;
}

function resetScore()
{
	score = 0;
}