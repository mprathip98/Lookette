const questionNumber =  document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const questionText2 = document.querySelector(".question-text2");
const optionContianer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answer-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");


let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswers = 0;
let attemps = 0;


function setAvailableQuestion(){
     const totalQuestion = quiz.length;
     for(let i=0; i<totalQuestion; i++){
          availableQuestion.push(quiz[i])
     }
}

function getNewQuestion(){
     questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
     if (questionCounter > 4) {
          document.getElementById("eyeClass").innerHTML = '<img src="le.png" width="70px">'
     }
     else{
          document.getElementById("eyeClass").innerHTML = '<img src="re.png" width="70px">'
          window.alert="Close Right Eye! ";
     }

     const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
     currentQuestion = questionIndex;
     questionText.innerHTML = currentQuestion.q;
     questionText2.innerHTML = currentQuestion.letter;

     const index1 = availableQuestion.indexOf(questionIndex);
     availableQuestion.splice(index1,1);

     const optionLen = currentQuestion.options.length
     for(let i=0; i<optionLen; i++){
          availableOptions.push(i)
     }

     optionContianer.innerHTML = ''
     let animationDelay = 0.1;

     //create options in html
     for(let i=0; i<optionLen; i++){

          const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
          const index2 = availableOptions.indexOf(optonIndex);
          availableOptions.splice(index2,1)
          

          const option = document.createElement("div");
          option.innerHTML = currentQuestion.options[optonIndex];
          option.id = optonIndex;
          option.style.animationDelay = animationDelay + 's';
          animationDelay = animationDelay + 0.1;
          option.className = "option";
          optionContianer.appendChild(option);
          option.setAttribute("onclick","getResult(this)");
     }

     questionCounter++
     
}

function getResult(element){
     const id = parseInt(element.id); 

     if(id == currentQuestion.answer){
          element.classList.add("correct")
          updateAnswerIndicator("correct");
          correctAnswers++;
     }
     else{
          element.classList.add("wrong")

          updateAnswerIndicator("wrong");


          const optionLen = optionContianer.children.length;
          
          for (let i=0; i<optionLen; i++){

               if(parseInt(optionContianer.children[i].id) == currentQuestion.answer){
                    optionContianer.children[i].classList.add("correct")
               }

          }
     }

     attemps++;
     unclickableOptions();
}

function unclickableOptions(){
     const optionLen = optionContianer.children.length;
     for (let i=0; i<optionLen; i++) {
          optionContianer.children[i].classList.add("already-answered");
     }
}

function answersIndicator(){
     answersIndicatorContainer.innerHTML = '';
     const totalQuestion = quiz.length;
     for (let i=0; i<totalQuestion; i++){
          const indicator = document.createElement("div");
          answersIndicatorContainer.appendChild(indicator);      
     }
}

function updateAnswerIndicator(markType){
     answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}


function next(){
     if(questionCounter == quiz.length){
          quizOver();
     }
     else{
          getNewQuestion();
     }
}

function quizOver(){
     quizBox.classList.add("hide");
     resultBox.classList.remove("hide");
     quizResult();
}

function quizResult(){
     resultBox.querySelector(".total-questions").innerHTML = quiz.length;
     resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
     resultBox.querySelector(".total-wrong").innerHTML = attemps - correctAnswers;
     const percentage = (correctAnswers/quiz.length)*100;
     resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
     resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
     if (correctAnswers > "6") {
          resultBox.querySelector(".gtd").innerHTML = "Perfetly Alright Eye!";
     }
     else {
          resultBox.querySelector(".gtd").innerHTML = "Need to Visit Doctor.";
     }
}

function resetQuiz(){
     questionCounter = 0;
     correctAnswers = 0;
     attemps = 0;
}


function tryAgainQuiz(){
     resultBox.classList.add("hide");
     quizBox.classList.remove("hide");
     resetQuiz();
     startQuiz();
}

function backToHome(){
     resultBox.classList.add("hide");
     homeBox.classList.remove("hide");
     resetQuiz();
     window.location = "index.html"
}


function startQuiz(){

     homeBox.classList.add("hide");

     quizBox.classList.remove("hide");

     setAvailableQuestion();
     getNewQuestion();

     answersIndicator();

}

window.onload = function(){
     homeBox.querySelector(".total-question").innerHTML = quiz.length;
}