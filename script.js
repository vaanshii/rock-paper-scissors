let humanPoints = 0;
let computerPoints = 0;
let roundCount = 0;

const rockButton = document.querySelector(".ROCK");
const paperButton = document.querySelector(".PAPER");
const scissorButton = document.querySelector(".SCISSOR");
const playerSide = document.querySelector(".player-side");
const computerSide = document.querySelector(".computer-side");
const heading = document.querySelector('nav h1');

playGame();

function displayToScreen(screen, asset) {
    if(!screen.hasChildNodes()) {
        image = document.createElement('img');
        image.setAttribute('src', asset)
        screen.appendChild(image);
    }
}

function getPlayerChoice() {
    return new Promise((choice) => {
        rockButton.addEventListener('click', ()=> {
            displayToScreen(playerSide, "assets/rock.png");
            choice("ROCK");
        });
    
        paperButton.addEventListener('click', () => {
            displayToScreen(playerSide, "assets/paper.png");
            choice("PAPER");
        });
    
        scissorButton.addEventListener('click', () => {
            displayToScreen(playerSide, "assets/scissors.png");
            choice("SCISSOR");
        });
    });
}

function getComputerChoice() {
    let randomNumber = Math.floor((Math.random() * 3) + 1);

    switch(randomNumber) {
        case 1: 
            displayToScreen(computerSide, "assets/rock.png");
            return "ROCK";
        case 2: 
            displayToScreen(computerSide, "assets/paper.png");
            return "PAPER";
        case 3: 
            displayToScreen(computerSide, "assets/scissors.png");
            return "SCISSOR";
    }
}

async function playRound() {
    let playerChoice = await getPlayerChoice();
    let computerChoice = getComputerChoice();

   if(playerChoice === computerChoice) {
       heading.textContent = 'DRAW!';
        return;
    }
    else if((playerChoice === "ROCK" && computerChoice === "SCISSOR") ||
            (playerChoice === "PAPER" && computerChoice === "ROCK") || 
            (playerChoice === "SCISSOR" && computerChoice === "PAPER")) {
        heading.textContent = `You Win! ${roundResult(playerChoice)}`;
        humanPoints++;
    }
    else {
        heading.textContent = `You Lose! ${roundResult(computerChoice)}`;
        computerPoints++;
    }

    roundCount++;
    //Logging
    console.log(`Round ${roundCount} result - You: ${playerChoice} | Computer: ${computerChoice}`);
}

function roundResult(choice) {
    switch(choice) {
        case "ROCK": return "Rock beats Scissors"
        case "PAPER": return "Paper beats Rock"
        case "SCISSOR": return "Scissors beats Paper"
    }
}

async function playGame() {
    while(roundCount < 5) {
       await playRound();
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

