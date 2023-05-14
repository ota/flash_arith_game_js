// Initialize game variables
let stageLevel = 1;
let score = 0;
let highScore = 0;
let numbers = [];

// Function to start game
function startGame() {
    document.getElementById('flash-display').style.color = "black";
    document.getElementById('flash-display').textContent = "#";

    stageLevel = 1;
    score = 0;
    updateInterface();

    countdown();
    setTimeout(nextRound, 5000);
}

function countdown() {
    document.getElementById('flash-display').style.color = "red";
    let count = 3;
    document.getElementById('flash-display').textContent = count;
    let countdownInterval = setInterval(function() {
        count--;
        if (count === 0) {
            clearInterval(countdownInterval);
            document.getElementById('flash-display').textContent = "Go!";
        } else {
            document.getElementById('flash-display').textContent = count;
        }
    }, 1000);
}

// Function for each round of the game
function nextRound() {
    document.getElementById('flash-display').style.color = "black";
    document.getElementById('flash-display').textContent = " ";
    // Generate random numbers
    numbers = generateNumbers(stageLevel);

    // Display numbers briefly
    flashNumbers(numbers);

    // Generate answer choices
    let choices = generateChoices(numbers);

    // Display choices for user to select
    displayChoices(choices);
}

// Function to generate random numbers
function generateNumbers(stageLevel) {
    let numbers = [];
    // Add your logic to generate 'stageLevel' random numbers and add them to 'numbers' array
    for(let i=0; i<stageLevel; i++){
        // Generate a random number less than 10 and add it to 'numbers' array
        let randomNumber = Math.floor(Math.random() * 9) + 1;
        numbers.push(randomNumber);
    }
    return numbers;
}

// Function to briefly flash numbers on screen
function flashNumbers(numbers) {
    const display = document.getElementById('flash-display'); // Ensure you have an element with id 'flash-display' in your HTML
    display.style.whiteSpace = "pre";
    let i = 0;
    const intervalId = setInterval(function() {
        if (i >= numbers.length) {
            clearInterval(intervalId);
            return;
        }
        display.textContent = numbers[i];
        setTimeout(function() {
            display.textContent = " ";
        }, 100); // clears the number after 100ms
        i++;
    }, 200); // changes the number every 200ms
}

// Function to generate answer choices
function generateChoices(numbers) {
    let choices = [];
    let sum = numbers.reduce((a, b) => a + b, 0);  // Calculate the sum of 'numbers'
    
    // Add the sum to 'choices' array
    choices.push(sum);
    
    // Generate 3 other unique choices
    while(choices.length < 4){
        // Generate a random number between (sum-10) and (sum+10)
        let randomChoice = Math.floor(Math.random() * 21) + (sum - 10);
        
        // If the generated number is not equal to the sum and not already in the 'choices' array, add it to the array
        if(randomChoice !== sum && !choices.includes(randomChoice)){
            choices.push(randomChoice);
        }
    }
    
    // Shuffle the 'choices' array so the correct answer (sum) is not always in the first position
    choices.sort(() => Math.random() - 0.5);
    
    return choices;
}

// Function to display answer choices
function displayChoices(choices) {
    const choicesContainer = document.getElementById('choices-container'); // Ensure you have an element with id 'choices-container' in your HTML
    choicesContainer.innerHTML = ''; // Remove previous choices

    choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.classList.add('choice-button'); // Add class for styling
        choiceButton.textContent = choice;
        choiceButton.addEventListener('click', function() {
	    console.log("Button clicked");
            handleAnswer(choice);
        });
        choicesContainer.appendChild(choiceButton);
    });
}

// Function to handle user's answer
function handleAnswer(answer) {
    // Calculate the correct answer
    let correctAnswer = numbers.reduce((a, b) => a + b, 0);

    // Check if 'answer' is correct
    if(answer == correctAnswer){
        // If correct, increment score and stageLevel
        score = stageLevel;
        stageLevel++;
        // Start next round
        nextRound();
	updateInterface();
    } else {
	gameOver();
    }
}

function gameOver() {
    if (score > highScore) {
        highScore = score;
        // Update high score display
        document.getElementById("highScore").textContent = highScore;
    }

    const buttons = document.getElementsByClassName('choice-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    document.getElementById('flash-display').textContent = "Game Over";
    document.getElementById('flash-display').style.color = "red";
}

// Function to update the score and stage level on the interface
function updateInterface() {
    document.getElementById('stageLevel').textContent = stageLevel;
}

// Add event listener for game start button
document.getElementById("start-button").addEventListener("click", startGame);
