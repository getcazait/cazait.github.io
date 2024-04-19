const questions = [
    { question: "Who was the first President of the United States?", answers: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], correctAnswer: "George Washington" }, // 1
    { question: "Which ancient civilization built the pyramids?", answers: ["Mesopotamians", "Egyptians", "Greeks", "Romans"], correctAnswer: "Egyptians" }, // 2
    { question: "In which year did World War I begin?", answers: ["1914", "1918", "1939", "1941"], correctAnswer: "1914" }, // 3
    { question: "Who was the first female Prime Minister of the United Kingdom?", answers: ["Margaret Thatcher", "Queen Elizabeth I", "Theresa May", "Indira Gandhi"], correctAnswer: "Margaret Thatcher" }, // 4
    { question: "Who wrote the \"I Have a Dream\" speech?", answers: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "Abraham Lincoln"], correctAnswer: "Martin Luther King Jr." }, // 5
    { question: "Which ancient civilization is known for its epic poem, the \"Iliad\"?", answers: ["Sumerians", "Egyptians", "Greeks", "Romans"], correctAnswer: "Greeks" }, // 6
    { question: "The French Revolution began in which year?", answers: ["1776", "1789", "1812", "1848"], correctAnswer: "1789" }, // 7
    { question: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?", answers: ["Joseph Stalin", "Vladimir Putin", "Nikita Khrushchev", "Mikhail Gorbachev"], correctAnswer: "Nikita Khrushchev" }, // 8
    { question: "Who was the first Emperor of Rome?", answers: ["Julius Caesar", "Augustus", "Nero", "Constantine"], correctAnswer: "Augustus" }, // 9
    { question: "Which event marked the end of the medieval period in Europe?", answers: ["The Renaissance", "The Crusades", "The Black Death", "The Protestant Reformation"], correctAnswer: "The Renaissance" }, // 10
    
];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('nextButton');
const alertElement = document.getElementById('alert');
const scoreElement = document.getElementById('score');

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupQuiz() {
    if (shuffledQuestions.length === 0) {
        shuffledQuestions = [...questions];
        shuffle(shuffledQuestions);
        currentQuestionIndex = 0;
    }

    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answerButton');
        button.addEventListener('click', () => checkAnswer(answer, currentQuestion.correctAnswer));
        answersElement.appendChild(button);
    });

    scoreElement.textContent = "Score: " + score;
}

function showAlert(message, type) {
    alertElement.textContent = message;
    alertElement.style.display = 'block';
    alertElement.className = 'alert ' + type;
    setTimeout(() => {
        alertElement.style.display = 'none';
    }, 3000);
}

function checkAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        showAlert("Great job! You answered correctly!", 'success');
        score++;
    } else {
        showAlert("Oops! That's incorrect. The correct answer is: " + correctAnswer, 'error');
        score = 0; // Reset the score if the answer is incorrect
    }

    currentQuestionIndex++;
    if (currentQuestionIndex === shuffledQuestions.length) {
        showAlert("Quiz completed! Your final score is: " + score + " out of " + questions.length, 'success');
        shuffledQuestions = [];
    }

    setupQuiz();
}

nextButton.addEventListener('click', setupQuiz);

// Initial setup
setupQuiz();