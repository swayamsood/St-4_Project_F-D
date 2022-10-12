// CREATE A QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
        this.correct = new Array(this.questions.length);
        for(let i=0; i<this.correct.length; i++){
          this.correct[i] = 0;
        }
        this.submitAnswers = new Array(this.questions.length);
        for(let j=0; j<this.submitAnswers.length; j++){
          this.submitAnswers[j] = "";
        }
    }

    getQuestionIndex() {
      var element1 = document.getElementById("prevbtn");
      if(this.questionIndex>0){
        element1.style.display = "block";
      }
      else{
        element1.style.display = "none";
      }

      if(this.questionIndex==this.questions.length-1){
        document.getElementById("nextbtn").innerHTML = "Submit";
      }
      else{
        document.getElementById("nextbtn").innerHTML = "Next";
      }
      return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
          if(this.correct[this.questionIndex]==0){
            this.score++;
            this.correct[this.questionIndex]=1;
          }
        }
        else{
          if(this.correct[this.questionIndex]==1){
            this.score--;
            this.correct[this.questionIndex]=0;
          }
        }
        this.submitAnswers[this.questionIndex] = answer;
        document.getElementById("yourAnswer").innerHTML = this.submitAnswers[this.questionIndex];
    }

    previous(){
      this.questionIndex--;
    }

    next(){
      this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}


// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        document.getElementById("yourAnswer").innerHTML = quiz.submitAnswers[quiz.questionIndex];
        showProgress();
    }
};

// GUESS ANSWER
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
      quiz.guess(guess);
    }
};

function previous(){
  quiz.previous();
  displayQuestion();
};

function next(){
  quiz.next();
  displayQuestion();
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML = 
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>Thank you for giving quiz </h1>
    <h1 id='score'>Congratulations :) </h1>
    <h2 id='score'> You scored: ${quiz.score*1} of ${quiz.questions.length}</h2>
    <h2 id='score'> Correct Answers: ${quiz.score}</h2>
    <h2 id='score'> Wrong Answers: ${quiz.questions.length-quiz.score}</h2>
    <div class="quiz-repeat">
        <a href="Quiz.html">Back To Quiz</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
      'What does the abbreviation HTML stand for?', ['HyperText Markdown Language.','HyperText Markup Language.','HighText Markup Language.','None of the above.'], 'HyperText Markup Language.'
    ),
    new Question(
      'How many sizes of headers are available in HTML by default?', ['5','1','3','6'], '6'
    ),
    new Question(
      'What is the smallest header in HTML by default?', ['h1','h2','h6','h4'], 'h6'
    ),
    new Question(
      'What are the types of lists available in HTML?', ['Ordered, Numbered Lists.','Named, Unnamed Lists.','Ordered, Unordered Lists.','None of the above.'], 'Ordered, Unordered Lists.'
    ),
    new Question(
      'What are the properties of block-level elements?', ['It always starts on a new line.','It always takes the full width available.','It has a top and bottom margin.','All of the above.'], 'All of the above.'
    ),
    new Question(
      'What are the main components of the front end of any working website?', ['HTML, CSS, Javascript.','HTML only.','Javascript only.','Node.js.'], 'HTML, CSS, Javascript.'
    ),
    new Question(
      'What is the effect of the <b> tag?', ['It converts the text within it to bold font.','It is used to write black-colored font.','It is used to change the font size.','None of the above.'], 'It converts the text within it to bold font.'
    ),
    new Question(
      'Which of the following is correct about HTML?', ['HTML uses User Defined Tags.','HTML uses tags defined within the language.','Both A and B.','None of the above.'], 'HTML uses tags defined within the language.'
    ),
    new Question(
      'The CSS inside HTML elements used alongside style attribute is called?', ['Inline CSS.','Internal CSS.','External CSS.','None of the above.'], 'Inline CSS.'
    ),
    new Question(
      'Which of the following colors contain equal amounts of RBG?', ['White','Gray','Black','All of the above'], 'All of the above'
    )

];

// INITIALIZE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();

// Add A CountDown for the Quiz
let time = 0.5;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();
