let humanPoints = 0;
let computerPoints = 0;
let roundCount = 0;

playGame(); //main game loop
//playRound(humanChoice, computerChoice); //for testing

function getComputerChoice() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);

    switch(randomNumber) {
        case 1: return "ROCK";
        case 2: return "PAPER";
        case 3: return "SCISSOR";
    }
}

function getHumanChoice() {
    let userInput = prompt("Rock | Paper | Scissor")

    if(!(userInput == null || userInput == undefined)) {
        userInput = userInput.toUpperCase();
    }

    switch(userInput) {
        case "ROCK": return "ROCK";
        case "PAPER": return "PAPER";
        case "SCISSOR": return "SCISSOR";
        default: return "INVALID";
    }
}

function playRound() {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();

    if(humanChoice === "INVALID" || humanChoice == null || humanChoice == undefined) {
        alert("Invalid Input! Try Again!");
        roundCount--;
    }
    else if(humanChoice === computerChoice) {
        alert("Draw!");
        roundCount--;
    }
    else if((humanChoice === "ROCK" && computerChoice === "SCISSOR") || (humanChoice === "PAPER" && computerChoice === "ROCK") || (humanChoice === "SCISSOR" && computerChoice === "PAPER")) {
        alert(`You Win! ${roundResult(humanChoice)}`)
        humanPoints++;
    }
    else {
        alert(`You Lose! ${roundResult(computerChoice)}`)
        computerPoints++;
    }

    //Log
    console.log(`Round ${roundCount} result - You: ${humanChoice} | Computer: ${computerChoice}`);
}

function roundResult(choice) {
    switch(choice) {
        case "ROCK": return "Rock beats Scissors"
        case "PAPER": return "Paper beats Rock"
        case "SCISSOR": return "Scissors beats Paper"
    }
}

function playGame() {
    while(roundCount < 5) {
        playRound();
        roundCount++;
    }

    if(humanPoints > computerPoints) {
        alert("Human Wins!")
    }
    else {
        alert("Computer Wins!");
    }

    console.log(`Human Score: ${humanPoints}`); // for logging
    console.log(`Computer Score: ${computerPoints}`);

    roundCount = 0; // resetting
    computerPoints = 0;
    humanPoints = 0;
    
    if (confirm("Would you like to play again?")) {
        playGame();
    }
    else {
        alert("Thanks for playing!")
    }
}

