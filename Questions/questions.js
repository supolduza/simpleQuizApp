console.log('this quiz app is dedicated to: Sonia David - LomL')

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("questions.json").then(res => {
    return res.json();
})
.then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;

   // game.classList.remove('hidden');
   // loader.classList.add('hidden');
    startGame();
});
//.catch(err => {
//    console.error(err);
//});

/*[
    {
        question: "Which of the following taxes is a progressive tax?",
        choice1: "Income Tax",
        choice2: "Custom Tax",
        choice3: "Sales Tax",
        choice4: "Excise Duty",
        answer: 1
    },
    {
        question: "Find the mean of 8, 3, 5, 2, 7, 5, 7, 3, 6, 7.",
        choice1: "5.1",
        choice2: "5.2",
        choice3: "5.3",
        choice4: "5.4",
        answer: 3
    },
    {
        question: "Find the mode of the followwing set of numbers: 2, 6, 7, 6, 8, 5, 2, 4, 2, 4, 5.",
        choice1: "2",
        choice2: "4",
        choice3: "5",
        choice4: "7",
        answer: 3
    },
    {
        question: "Find the median of the following percentage: 43%, 76%, 64%, 37%, 76%, 54%.",
        choice1: "64%",
        choice2: "54%",
        choice3: "118%",
        choice4: "59%",
        answer: 4
    },
    {
        question: "A demand curve can shift because of changing...",
        choice1: "Income",
        choice2: "Prices of related goods",
        choice3: "Taste",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "If your income during one year is N10,000 and the following year is N12,000, then it has increased by?",
        choice1: "20%",
        choice2: "2%",
        choice3: "12%",
        choice4: "16%",
        answer: 1
    },
    {
        question: "When total utility reaches its maximum, then marginal utility will be...",
        choice1: "Minimum",
        choice2: "Average",
        choice3: "Zero",
        choice4: "Negative",
        answer: 3
    },
    {
        question: "Which of the following taxes is a progressive tax?",
        choice1: "Custom Tax",
        choice2: "Income Tax",
        choice3: "Sales Tax",
        choice4: "Excise Duty",
        answer: 2
    },
    {
        question: "A supply curve is directly affected by?",
        choice1: "Technology",
        choice2: "Input Costs",
        choice3: "Government Regulations",
        choice4: "All of the above",
        answer: 4
    },
    {
        question: "Other things being equal, what causes a decrease in demand?",
        choice1: "Rise in the price of the substitute",
        choice2: "Fall in the price of the commodity",
        choice3: "Rise in the income of the consumer",
        choice4: "Rise in the price of the commodity",
        answer: 4
    }
]*/
    
    /*,
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 10
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 1
    },*/

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();

    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        //go to the end page...
        return window.location.assign('../End-Page/end-page.html');
    }

    questionCounter++;
    //questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS;
    progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
    //UPDATE THE PROGRESS BAR
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    console.log(availableQuestions);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        //selectedChoice.parentElement.classList.remove(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
}); 

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

