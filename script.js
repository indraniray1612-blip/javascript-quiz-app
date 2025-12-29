const curridx = document.querySelector("#current");
const timer = document.querySelector("#time");
const ques = document.querySelector(".ques-text");
const options = document.querySelector("#options");
const score = document.querySelector("#curr-score");
const total = document.querySelector("#total");
const quiz = document.querySelector(".quiz");
const btn = document.querySelector(".btn");
const userName = document.querySelector("#user");
const startScreen = document.querySelector(".start-page");
const quizScreen = document.querySelector(".quiz-body");

let currscore = 0;
let time = 10;
let idx = 0;
let timerId = null;
let name = "";

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "Which method converts JSON to a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.parse()",
      "JSON.object()"
    ],
    answer: 2
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "#", "//", "/* */"],
    answer: 2
  },
  {
    question: "Which array method is used to remove the last element?",
    options: ["shift()", "pop()", "push()", "unshift()"],
    answer: 1
  },
  {
    question: "Which keyword stops a loop immediately?",
    options: ["stop", "exit", "break", "return"],
    answer: 2
  },
  {
    question: "What is the default value of an uninitialized variable?",
    options: ["null", "0", "undefined", "NaN"],
    answer: 2
  },
  {
    question: "Which function is used to delay execution in JavaScript?",
    options: ["setInterval()", "delay()", "wait()", "setTimeout()"],
    answer: 3
  },
  {
    question: "Which operator checks both value and type?",
    options: ["==", "=", "===", "!="],
    answer: 2
  },
  {
    question: "Which method is used to fetch data from an API?",
    options: ["axios()", "request()", "fetch()", "getData()"],
    answer: 2
  }
];

const quizQuestions = [...questions].sort(() => Math.random() - 0.5);

total.textContent = quizQuestions.length;

function renderQuestion() {
  let currSet = quizQuestions[idx];
  curridx.textContent = idx + 1;
  clearInterval(timerId);
  startTimer();
  ques.textContent = currSet.question;

  options.innerHTML = "";
  currSet.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;

    li.dataset.index = index;
    li.onclick = () => handleAnswer(index, currSet);

    options.appendChild(li);
  });
}

function startTimer() {
  time = 10;
  timer.textContent = time;

  timerId = setInterval(() => {
    time--;
    timer.textContent = time;

    if (time === 0) {
      clearInterval(timerId);
      timerId = null;
      const allOptions = document.querySelectorAll("#options li");
      const correctIdx = quizQuestions[idx].answer;

      allOptions.forEach((li) => li.classList.add("disabled"));
      allOptions[correctIdx].classList.add("correct");

      setTimeout(() => {
        nextQuestion();
      }, 2000);
    }
  }, 1000);
}

function handleAnswer(idx, set) {
  clearInterval(timerId);

  const allOptions = document.querySelectorAll("#options li");
  const actualAns = set.answer;

  allOptions.forEach((li) => li.classList.add("disabled"));

  if (idx === actualAns) {
    allOptions[idx].classList.add("correct");
    currscore++;
    score.textContent = currscore;
  } else {
    allOptions[actualAns].classList.add("correct");
    allOptions[idx].classList.add("wrong");
  }
  setTimeout(() => {
    nextQuestion();
  }, 2000);
}

function nextQuestion() {
  if (timerId) clearInterval(timerId);

  idx++;

  if (idx < quizQuestions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quiz.classList.add("result");
  quiz.innerHTML = `<h2>Quiz completed!</h2>
 <p><strong>${name}, your score is ${currscore}</strong></p>`;
}

btn.addEventListener("click", () => {
  name = userName.value.trim();

  if (name === "") {
    alert("Invalid input! Enter your name.");
    return;
  }
  startScreen.style.display = "none";
  quizScreen.style.display = "block";

  renderQuestion();
});