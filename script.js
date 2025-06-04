 const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Madrid", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "What does CSS stand for?",
      options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style System", "Creative Style Syntax"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "Which HTML tag is used for inserting a line break?",
      options: ["<break>", "<br>", "<lb>", "<line>"],
      answer: "<br>"
    }
  ];

  let currentIndex = 0;
  let score = 0;

  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextBtn = document.getElementById('nextBtn');
  const scoreEl = document.getElementById('score');

  // Create restart button
  const restartBtn = document.createElement('button');
  restartBtn.textContent = "Retake Quiz";
  restartBtn.id = "restartBtn";
  restartBtn.style = `
    margin-top: 16px;
    padding: 12px 20px;
    background: #38a169;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
  `;
  restartBtn.addEventListener('click', restartQuiz);

  function loadQuestion() {
    const currentQ = quizData[currentIndex];
    questionEl.textContent = currentQ.question;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.innerHTML = "";

    currentQ.options.forEach(optionText => {
      const btn = document.createElement('button');
      btn.textContent = optionText;
      btn.classList.add('option');
      btn.onclick = () => handleAnswer(btn, currentQ.answer);
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedBtn, correctAnswer) {
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) {
        btn.classList.add('correct');
      } else if (btn === selectedBtn && btn.textContent !== correctAnswer) {
        btn.classList.add('wrong');
      }
    });

    if (selectedBtn.textContent === correctAnswer) score++;
    nextBtn.style.display = "inline-block";
  }

  nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }

  function showScore() {
    questionEl.textContent = "🎉 Quiz Finished!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";

    scoreEl.innerHTML = `
      <div style="text-align: center;">
        <p style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">
          Your Score: ${score} / ${quizData.length}
        </p>
      </div>
    `;
    scoreEl.appendChild(restartBtn);
  }

  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    restartBtn.remove();
    loadQuestion();
  }

  // Start quiz
  loadQuestion();