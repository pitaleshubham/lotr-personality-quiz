/**
 * Lord of the Rings Personality Quiz
 * Logic and State Management
 */

(() => {
  'use strict';

  // Debug mode check from URL
  const urlParams = new URLSearchParams(window.location.search);
  const isDebugMode = urlParams.get('debug') === 'true';

  // Character descriptions
  const characterInfo = {
    "Boromir": "You are noble but burdened. You perceive the harsh realities of the world and seek practical power to protect what you love, though your impulses can sometimes cloud your judgment.",
    "Gollum": "You are deeply conflicted and isolated. Driven by instinct and survival, you struggle with attachments, often letting impulse and desire override strategy.",
    "Aragorn": "You are a natural leader. You possess great power and strategic mind, yet temper them with loyalty to others and remarkable self-control.",
    "Gandalf": "You are a guide and a strategist. You weave intricate plans to combat darkness, possessing immense power but choosing to inspire rather than dominate.",
    "Sam": "You are the truest friend. Your unwavering loyalty and grounded attachments make you the bedrock of any quest. You eschew power for the love of the simple and good.",
    "Gimli": "You are steadfast and bold. Fiercely loyal and unapologetically direct, you bring strength and camaraderie to the fellowship.",
    "Frodo": "You are resilient and pure of heart. You bear the heaviest burdens not out of a desire for power, but out of a selfless capacity to endure for the sake of others."
  };

  // State Variables
  let currentQuestionIndex = 0;
  let scores = { P: 0, S: 0, A: 0, I: 0 };

  // Questions Array (12 Questions)
  const questions = [
    {
      text: "You’re given responsibility no one wants.",
      options: [
        { text: "Accept quietly and carry it", score: { P: 0, S: 1, A: 1, I: 0 } },
        { text: "Clarify expectations before agreeing", score: { P: 0, S: 2, A: 0, I: 0 } },
        { text: "Suggest someone else may handle it better", score: { P: -1, S: 0, A: 1, I: 0 } },
        { text: "Take it and reshape it your way", score: { P: 2, S: 0, A: 0, I: 0 } },
        { text: "Avoid it unless forced", score: { P: 0, S: 0, A: 0, I: 1 } }
      ]
    },
    {
      text: "When challenged publicly, you:",
      options: [
        { text: "Stay calm and explain", score: { P: 0, S: 1, A: 0, I: 0 } },
        { text: "Feel irritated but maintain posture", score: { P: 1, S: 0, A: 0, I: 0 } },
        { text: "Doubt yourself later", score: { P: 0, S: 0, A: 1, I: 0 } },
        { text: "Double down confidently", score: { P: 2, S: 0, A: 0, I: 1 } },
        { text: "Withdraw", score: { P: 0, S: 0, A: -1, I: 1 } }
      ]
    },
    {
      text: "A powerful artifact is offered to you. It promises to solve all your current problems.",
      options: [
        { text: "Take it immediately to protect your people", score: { P: 2, S: 0, A: 1, I: 2 } },
        { text: "Study it carefully to understand its cost", score: { P: 1, S: 2, A: 0, I: 0 } },
        { text: "Refuse it, trusting your own strength", score: { P: 1, S: 1, A: 0, I: 0 } },
        { text: "Give it to someone wiser to hold", score: { P: 0, S: 1, A: 1, I: 0 } },
        { text: "Desire it but hesitate in fear", score: { P: 1, S: 0, A: 0, I: 2 } }
      ]
    },
    {
      text: "Your closest friend is accused of betrayal.",
      options: [
        { text: "Defend them unconditionally", score: { P: 0, S: 0, A: 2, I: 1 } },
        { text: "Demand proof before acting", score: { P: 0, S: 2, A: 1, I: 0 } },
        { text: "Confront them privately to find the truth", score: { P: 1, S: 1, A: 1, I: 0 } },
        { text: "Cut ties to protect the mission", score: { P: 1, S: 2, A: -1, I: 0 } },
        { text: "Attack the accuser", score: { P: 2, S: 0, A: 1, I: 2 } }
      ]
    },
    {
      text: "In battle, your commander orders a retreat, but you see a fleeting chance for a decisive strike.",
      options: [
        { text: "Follow orders and retreat", score: { P: 0, S: 1, A: 2, I: 0 } },
        { text: "Ignore the order and charge", score: { P: 1, S: 0, A: 0, I: 2 } },
        { text: "Convince others to join your strike", score: { P: 2, S: 1, A: 0, I: 1 } },
        { text: "Retreat, but plan a counter-attack", score: { P: 1, S: 2, A: 0, I: 0 } },
        { text: "Stay back alone to cover the retreat", score: { P: 0, S: 0, A: 2, I: 1 } }
      ]
    },
    {
      text: "You discover a hidden path into the enemy's stronghold.",
      options: [
        { text: "Keep it secret for your own advantage", score: { P: 2, S: 1, A: -1, I: 0 } },
        { text: "Tell your leader immediately", score: { P: 0, S: 1, A: 2, I: 0 } },
        { text: "Gather a small, trusted group to scout it", score: { P: 1, S: 2, A: 1, I: 0 } },
        { text: "Rush in blindly to catch them off guard", score: { P: 2, S: 0, A: 0, I: 2 } },
        { text: "Block it off so the enemy cannot use it", score: { P: 0, S: 2, A: 1, I: 0 } }
      ]
    },
    {
      text: "A stranger asks for shelter during a harsh storm.",
      options: [
        { text: "Welcome them warmly without question", score: { P: 0, S: 0, A: 2, I: 1 } },
        { text: "Interrogate them first before deciding", score: { P: 1, S: 2, A: 0, I: 0 } },
        { text: "Turn them away, trusting no one", score: { P: 1, S: 1, A: -1, I: 1 } },
        { text: "Let them stay, but keep your weapon close", score: { P: 1, S: 1, A: 1, I: 0 } },
        { text: "Hide and watch what they do", score: { P: 0, S: 1, A: -1, I: 1 } }
      ]
    },
    {
      text: "You are entrusted with a secret that could ruin an ally, but saving them harms innocent people.",
      options: [
        { text: "Expose the secret to protect the innocent", score: { P: 1, S: 0, A: 1, I: 1 } },
        { text: "Keep the secret and protect your ally", score: { P: 1, S: 1, A: 2, I: 0 } },
        { text: "Use the secret to blackmail the ally", score: { P: 2, S: 2, A: -1, I: 0 } },
        { text: "Seek advice from a wise mentor", score: { P: 0, S: 2, A: 1, I: 0 } },
        { text: "Keep it, but feel the immense guilt", score: { P: 0, S: 0, A: 1, I: 0 } }
      ]
    },
    {
      text: "A fierce beast guards a hoard of treasure you need for your quest.",
      options: [
        { text: "Charge in, hoping surprise wins the day", score: { P: 2, S: 0, A: 0, I: 2 } },
        { text: "Devise a complex plan to steal it while it sleeps", score: { P: 0, S: 2, A: 0, I: 0 } },
        { text: "Gather a large force to face the beast directly", score: { P: 2, S: 2, A: 1, I: 0 } },
        { text: "Try to parley or distract the beast", score: { P: 0, S: 1, A: 1, I: 1 } },
        { text: "Obsess over the treasure from afar", score: { P: 1, S: 0, A: -1, I: 2 } }
      ]
    },
    {
      text: "Your homeland is threatened by an overwhelming force.",
      options: [
        { text: "Stand and fight, no matter the odds", score: { P: 2, S: 0, A: 2, I: 2 } },
        { text: "Evacuate everyone to safety", score: { P: 0, S: 1, A: 2, I: 0 } },
        { text: "Seek out powerful allies for help", score: { P: 1, S: 2, A: 1, I: 0 } },
        { text: "Fortify your defenses and wait", score: { P: 1, S: 2, A: 1, I: 0 } },
        { text: "Preemptively strike the enemy leader", score: { P: 2, S: 1, A: 0, I: 2 } }
      ]
    },
    {
      text: "You find yourself hopelessly lost in an ancient, dark forest.",
      options: [
        { text: "Trust your instincts and power through", score: { P: 1, S: 0, A: 0, I: 2 } },
        { text: "Sit down, wait, and observe", score: { P: 0, S: 2, A: 0, I: -1 } },
        { text: "Call out for help, hoping a friend hears", score: { P: 0, S: 0, A: 2, I: 1 } },
        { text: "Retrace your exact steps logically", score: { P: 0, S: 2, A: 0, I: 0 } },
        { text: "Panic and run blindly", score: { P: 0, S: 0, A: -1, I: 2 } }
      ]
    },
    {
      text: "The journey is finally over, and the world is saved, but you are forever changed.",
      options: [
        { text: "Retire to a quiet life of peace with friends", score: { P: 0, S: 0, A: 2, I: 0 } },
        { text: "Take up a leadership role to rebuild", score: { P: 2, S: 2, A: 1, I: 0 } },
        { text: "Sail away, unable to heal completely", score: { P: 0, S: 0, A: 0, I: 0 } },
        { text: "Continue wandering, seeking new adventures", score: { P: 1, S: 0, A: 0, I: 2 } },
        { text: "Cling to the memory of the power you once held", score: { P: 2, S: 0, A: -1, I: 2 } }
      ]
    }
  ];

  // DOM Elements
  const introScreen = document.getElementById('intro-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  // Init
  function init() {
    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', resetQuiz);

    // Check debug mode
    if (isDebugMode) {
      document.getElementById('debug-scores').classList.remove('hidden');
    }
  }

  // Start Quiz
  function startQuiz() {
    transitionScreen(introScreen, quizScreen, renderQuestion);
  }

  // Render Question (DOM replace, no reload)
  function renderQuestion() {
    const question = questions[currentQuestionIndex];

    // Update progress
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    // Set text
    questionText.textContent = question.text;

    // Clear and inject options
    optionsContainer.replaceChildren();
    question.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';

      // Use a span to keep text above the gradient hover effect
      const span = document.createElement('span');
      span.textContent = option.text;
      btn.appendChild(span);

      btn.addEventListener('click', () => handleAnswer(option.score));
      optionsContainer.appendChild(btn);
    });

    // Ensure no option button is auto-focused after rendering
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }

  // Handle Answer Logic
  function handleAnswer(scoreObj) {
    // Explicitly blur the active element to prevent mobile focus retention
    if (document.activeElement) {
      document.activeElement.blur();
    }

    // Disable all buttons to prevent double clicking during transition
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    // Update Scores
    scores.P += scoreObj.P || 0;
    scores.S += scoreObj.S || 0;
    scores.A += scoreObj.A || 0;
    scores.I += scoreObj.I || 0;

    currentQuestionIndex++;

    // Fade out quiz container content, then update, then fade in
    quizScreen.classList.add('fading-out');
    quizScreen.classList.remove('active');

    setTimeout(() => {
      if (currentQuestionIndex < questions.length) {
        renderQuestion();
        quizScreen.classList.remove('fading-out');
        void quizScreen.offsetWidth; // Trigger reflow
        quizScreen.classList.add('active');
      } else {
        quizScreen.classList.remove('fading-out');
        showResult();
      }
    }, 400); // 400ms matches css transition
  }

  // Result determination logic
  function calculateResult() {
    const { P, S, A, I } = scores;

    if (isDebugMode) console.log(`[calculateResult] Received Scores: P=${P}, S=${S}, A=${A}, I=${I}`);

    // Exact deterministic logic from requirements:
    if (I >= 15 && A <= 5 && S <= 8) {
      if (isDebugMode) console.log(`[calculateResult] Match found: Gollum (I >= 15 && A <= 5 && S <= 8)`);
      return "Gollum";
    }
    if (A >= 14 && P <= 6 && I <= 8) {
      if (isDebugMode) console.log(`[calculateResult] Match found: Sam (A >= 14 && P <= 6 && I <= 8)`);
      return "Sam";
    }
    if (A >= 8 && P >= 8 && I >= 6 && I <= 11) {
      if (isDebugMode) console.log(`[calculateResult] Match found: Gimli (A >= 11 && P >= 8 && I >= 6 && I <= 11)`);
      return "Gimli";
    }
    if (S >= 13 && P >= 9 && A >= 9 && I <= 7) {
      if (isDebugMode) console.log(`[calculateResult] Match found: Aragorn (S >= 13 && P >= 9 && A >= 9 && I <= 7)`);
      return "Aragorn";
    }
    if (S >= 14 && I <= 6 && P >= 5 && P <= 11) {
      if (isDebugMode) console.log(`[calculateResult] Match found: Gandalf (S >= 14 && I <= 6 && P >= 5 && P <= 11)`);
      return "Gandalf";
    }
    if (P >= 14 && I >= 11 && A >= 4 && S <= 11) {
      if (isDebugMode) console.log(`[calculateResult] Match found: Boromir (P >= 14 && I >= 11 && A >= 4 && S <= 11)`);
      return "Boromir";
    }
    if (A >= 8 && S >= 7 && P <= 9 && I <= 10) {
      if (isDebugMode) console.log(`[calculateResult] Match found: Frodo (A >= 8 && S >= 7 && P <= 9 && I <= 10)`);
      return "Frodo";
    }

    if (isDebugMode) console.log(`[calculateResult] No specific match found: Defaulting to Frodo`);
    return "Frodo";
  }

  // Show Result Screen
  function showResult() {
    const resultCharacter = calculateResult();

    // Populate character
    document.getElementById('character-result').textContent = resultCharacter;
    document.getElementById('character-desc').textContent = characterInfo[resultCharacter] || "";

    // Debug scores
    if (isDebugMode) {
      document.getElementById('score-p').textContent = scores.P;
      document.getElementById('score-s').textContent = scores.S;
      document.getElementById('score-a').textContent = scores.A;
      document.getElementById('score-i').textContent = scores.I;
    }

    transitionScreen(quizScreen, resultScreen);
  }

  // Reset Quiz
  function resetQuiz() {
    currentQuestionIndex = 0;
    scores = { P: 0, S: 0, A: 0, I: 0 };
    transitionScreen(resultScreen, introScreen);
  }

  // Utility: Screen Transition
  function transitionScreen(hideElement, showElement, callback = null) {
    hideElement.classList.add('fading-out');
    hideElement.classList.remove('active');

    setTimeout(() => {
      hideElement.style.display = 'none';
      hideElement.classList.remove('fading-out');

      showElement.style.display = 'block';
      if (callback) callback();

      // Trigger reflow to restart animation
      void showElement.offsetWidth;
      showElement.classList.add('active');
    }, 400);
  }

  // Boot
  window.addEventListener('DOMContentLoaded', init);
})();
