const questions = [
    {
        question: "What do you prioritize when defending?",
        options: [
            "Stopping the opponent at all costs",   // 4 points
            "Positioning and reading the game",      // 3 points
            "Supporting the attack while defending", // 2 points
            "Staying back and covering space"        // 1 point
        ]
    },
    {
        question: "What is your strongest attacking skill?",
        options: [
            "Finishing and goal-scoring",            // 4 points
            "Creating chances for others",           // 3 points
            "Dribbling past defenders",               // 2 points
            "Making runs to open space"               // 1 point
        ]
    },
    {
        question: "How do you prefer to contribute to the team?",
        options: [
            "Leading the play and making key decisions", // 4 points
            "Supporting teammates and maintaining possession", // 3 points
            "Making quick plays and counters",            // 2 points
            "Staying in the background and waiting for opportunities" // 1 point
        ]
    },
    {
        question: "How would you describe your physical condition?",
        options: [
            "Excellent stamina and strength", // 4 points
            "Good fitness but needs improvement", // 3 points
            "Average fitness; can keep up", // 2 points
            "Struggles with fitness"         // 1 point
        ]
    },
    {
        question: "What type of play style do you prefer?",
        options: [
            "Aggressive and physical",       // 4 points
            "Tactical and strategic",        // 3 points
            "Creative and spontaneous",      // 2 points
            "Cautious and defensive"         // 1 point
        ]
    },
    {
        question: "How comfortable are you with heading the ball?",
        options: [
            "Very comfortable",              // 4 points
            "Somewhat comfortable",          // 3 points
            "Not very comfortable",          // 2 points
            "Uncomfortable"                  // 1 point
        ]
    },
    {
        question: "What is your favorite position to play?",
        options: [
            "Defender",                      // 4 points
            "Midfielder",                    // 3 points
            "Forward",                       // 2 points
            "Goalkeeper"                     // 1 point
        ]
    },
    {
        question: "How do you handle pressure during a game?",
        options: [
            "Thrive under pressure",         // 4 points
            "Manage it well",                // 3 points
            "Get nervous but perform",      // 2 points
            "Struggle with pressure"         // 1 point
        ]
    },
    {
        question: "How important is teamwork to you?",
        options: [
            "Essential, I need to work with others", // 4 points
            "Very important",                       // 3 points
            "Somewhat important",                   // 2 points
            "Not important"                         // 1 point
        ]
    },
    {
        question: "How would you rate your passing accuracy?",
        options: [
            "Very high",                  // 4 points
            "High",                       // 3 points
            "Average",                    // 2 points
            "Below average"               // 1 point
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question-text');
const options = document.querySelectorAll('input[name="answer"]');
const progressBar = document.getElementById('progress-bar');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const questionNumberElement = document.getElementById('currentQuestionIndex');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    options.forEach((option, index) => {
        option.value = currentQuestion.options[index];
        const label = document.querySelector(`label[for="option-${index}"]`);
        label.textContent = currentQuestion.options[index];
        option.checked = false; // Reset checked state
    });
    questionNumberElement.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    previousButton.disabled = currentQuestionIndex === 0;
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
}

function calculateScore() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const optionIndex = Array.from(options).indexOf(selectedOption);
        score += 4 - optionIndex; // 4 points for first option, 3 for second, etc.
    }
}

function determineRole() {
    if (score >= 30) {
        return "Striker";
    } else if (score >= 22) {
        return "Winger";
    } else if (score >= 15) {
        return "Attacking Midfielder";
    } else if (score >= 11) {
        return "Holding Midfielder";
    } else if (score >= 7) {
        return "Center Back";
    } else {
        return "Fullback";
    }
}

nextButton.addEventListener('click', () => {
    calculateScore();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        const role = determineRole();
        alert(`Your position is: ${role}`);
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }
});

previousButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        score = Math.max(0, score - 4); // Subtract up to 4 points when going back
        loadQuestion();
    }
});

loadQuestion();
