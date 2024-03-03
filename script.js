var quizData = [
    {
        question: "Which English team has won the most Premier League titles of all time?",
        a: "Manchester United",
        b: "Manchester City",
        c: "Liverpool",
        d: "Arsenal",
        correct: "a",
        image: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/48/Manchester-United-icon.png"
    },
    {
        question: "Which of these teams holds the longest unbeaten run in football?",
        a: "Arsenal",
        b: "Bayern Munich",
        c: "Juventus",
        d: "AC Milan",
        correct: "d",
        image: "https://icons.iconarchive.com/icons/giannis-zographos/italian-football-club/48/AC-Milan-icon.png"
    },
    {
        question: "Which country holds the most FIFA World Cup titles?",
        a: "France",
        b: "Germany",
        c: "Brazil",
        d: "Italy",
        correct: "c",
        image: "https://cdn3.emoji.gg/emojis/4291-brazil.png"
    },
    {
        question: "Who is the all-time goal-scoring record holder in the Champions League?",
        a: "Lionel Messi",
        b: "Karim Benzema",
        c: "Robert Lewandowski",
        d: "Cristiano Ronaldo",
        correct: "d",
        image: "https://cdn.emojidex.com/emoji/px64/ronaldo.png?1580472710"
    }
];

var quizContainer = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var a_text = document.getElementById('a_text');
var b_text = document.getElementById('b_text');
var c_text = document.getElementById('c_text');
var d_text = document.getElementById('d_text');
var submitBtn = document.getElementById('submit');
var answerImage = document.getElementById('answer-image');
var username = '';

var usernameInput = document.getElementById('username');
var registerBtn = document.getElementById('register-btn');

registerBtn.addEventListener('click', function() {
    username = usernameInput.value.trim();
    if (username !== '') {
        document.querySelector('.register-container').style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuiz();
    } else {
        alert('Please enter a username');
    }
});

var currentQuestion = 0;
var score = 0;

function loadQuiz() {
    var currentQuizData = quizData[currentQuestion];
    questionEl.textContent = currentQuizData.question;
    a_text.textContent = currentQuizData.a;
    b_text.textContent = currentQuizData.b;
    c_text.textContent = currentQuizData.c;
    d_text.textContent = currentQuizData.d;
}

function getSelectedAnswer() {
    var answerEls = document.querySelectorAll('input[name="answer"]');
    var selectedAnswer = null;
    for (var i = 0; i < answerEls.length; i++) {
        if (answerEls[i].checked) {
            selectedAnswer = answerEls[i].id;
            break;
        }
    }
    return selectedAnswer;
}

function displayFeedback(isCorrect, imageUrl) {
    var feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = isCorrect ? '<span class="correct-feedback">Correct!</span>' : '<span class="wrong-feedback">Wrong!</span>';
    if (imageUrl) {
        answerImage.src = imageUrl;
        answerImage.style.display = 'block';
    }
}

function clearFeedback() {
    var feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = '';
    answerImage.style.display = 'none';
}

submitBtn.addEventListener('click', function() {
    var selectedAnswer = getSelectedAnswer();
    if (!selectedAnswer) {
        alert('Please select an answer.');
        return;
    }
    var currentQuizData = quizData[currentQuestion];
    var isCorrect = selectedAnswer === currentQuizData.correct;
    if (isCorrect) {
        score++;
    }
    displayFeedback(isCorrect, currentQuizData.image);
    setTimeout(function() {
        currentQuestion++;
        clearFeedback();
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            var result = document.createElement('h2');
            result.textContent = 'Your result is ' + score + '/' + quizData.length + ' questions correct';
            quizContainer.innerHTML = '';
            quizContainer.appendChild(result);
        }
    }, 1000);
});
