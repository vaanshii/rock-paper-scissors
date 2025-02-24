const gameState = {
  playerPoints: 0,
  computerPoints: 0,
  roundCount: 0,
  isPopUpActive: false
};

const outcomes = {
  ROCK: "Rock beats Scissors",
  PAPER: "Paper beats Rock",
  SCISSOR: "Scissor beats Paper"
};

const playerSide = document.querySelector(".player-side");
const computerSide = document.querySelector(".computer-side");
const heading = document.querySelector(".header-title");
const scoreBoard = document.querySelector(".score-board");
const popUpContainer = document.querySelector(".pop-up-container");
const buttonContainer = document.querySelector(".button-container");

playGame();

function resetGameState() {
  gameState.playerPoints = 0;
  gameState.computerPoints = 0;
  gameState.roundCount = 0;
  gameState.isPopUpActive = false;
  scoreBoard.textContent = "0 - 0";
}

function playAgainPopUpBox(message) {
  const playAgainBox = document.createElement("div");
  const playAgainButton = document.createElement("button");
  playAgainBox.classList.add("pop-up-box");
  playAgainBox.textContent = message;
  playAgainButton.classList.add("continue-button");
  playAgainButton.textContent = "Play Again";

  popUpContainer.appendChild(playAgainBox);
  playAgainBox.appendChild(playAgainButton);

  playAgainButton.addEventListener("click", () => {
    resetGameState();
    clearScreen();
    playGame();
  });
}

function showWinnerBox(message) {
  if (gameState.playerPoints === 5 || gameState.computerPoints === 5) return;
  const popUpBox = document.createElement("div");
  const continueButton = document.createElement("button");
  popUpBox.classList.add("pop-up-box");
  continueButton.classList.add("continue-button");
  continueButton.textContent = "Continue";
  popUpBox.textContent = message;
  popUpContainer.appendChild(popUpBox);
  popUpBox.appendChild(continueButton);
  isPopUpActive = true;

  continueButton.addEventListener("click", () => {
    isPopUpActive = false;
    clearScreen();
  });
}

function simulateActionLoadingScreen() {
  const computerDotLoader = document.createElement("div");
  computerDotLoader.classList.add("dot-loader");
  computerSide.appendChild(computerDotLoader);

  return new Promise(() => {
    setTimeout(() => {
      computerSide.removeChild(computerSide.lastChild);
    }, 2000);
  });
}

function displayImageToScreen(screen, asset) {
  image = document.createElement("img");
  if (!screen.hasChildNodes()) {
    image.setAttribute("src", asset);
    screen.appendChild(image);
  }
}

function clearScreen() {
  if(playerSide.lastChild) playerSide.removeChild(playerSide.lastChild);
  if(computerSide.lastChild) computerSide.removeChild(computerSide.lastChild);
  if(popUpContainer.lastChild) popUpContainer.removeChild(popUpContainer.lastChild);
}

async function getPlayerChoice() {
  return new Promise((choice) => {
    buttonContainer.addEventListener("click", (e) => {
      if (gameState.isPopUpActive) return;

      let target = e.target;
      switch (target.id) {
        case "rock":
          displayImageToScreen(playerSide, "assets/rock.png");
          choice("ROCK");
          break;
        case "paper":
          displayImageToScreen(playerSide, "assets/paper.png");
          choice("PAPER");
          break;
        case "scissor":
          displayImageToScreen(playerSide, "assets/scissors.png");
          choice("SCISSOR");
          break;
      }
    });
  });
}

function roundResult(choice) {
  return outcomes[choice] || "Unknown";
}

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3 + 1);

  switch (randomNumber) {
    case 1:
      displayImageToScreen(computerSide, "assets/rock.png");
      return "ROCK";
    case 2:
      displayImageToScreen(computerSide, "assets/paper.png");
      return "PAPER";
    case 3:
      displayImageToScreen(computerSide, "assets/scissors.png");
      return "SCISSOR";
  }
}

async function playRound() {
  let playerChoice = await getPlayerChoice();
  simulateActionLoadingScreen();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  let computerChoice = await getComputerChoice();
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (playerChoice === computerChoice) {
    showWinnerBox("Draw!");
    return;
  } else if (
    (playerChoice === "ROCK" && computerChoice === "SCISSOR") ||
    (playerChoice === "PAPER" && computerChoice === "ROCK") ||
    (playerChoice === "SCISSOR" && computerChoice === "PAPER")
  ) {
    gameState.playerPoints++;
    showWinnerBox(`You Win! ${roundResult(playerChoice)}`);
  } else {
    gameState.computerPoints++;
    showWinnerBox(`You Lose! ${roundResult(computerChoice)}`);
  }
  scoreBoard.textContent = `${gameState.playerPoints} - ${gameState.computerPoints}`;

  gameState.roundCount++;
  //Logging
  console.log(
    `Round ${gameState.roundCount} result - You: ${playerChoice} | Computer: ${computerChoice}`
  );
}

async function playGame() {
  while (gameState.roundCount <= 10) {
    await playRound();
    if (gameState.playerPoints === 5 || gameState.computerPoints === 5) break;
  }

  if (gameState.playerPoints > gameState.computerPoints) {
    playAgainPopUpBox("Player Wins!");
  } else {
    playAgainPopUpBox("Computer Wins!");
  }

  console.log(`Human Score: ${gameState.playerPoints}`); // for logging
  console.log(`Computer Score: ${gameState.computerPoints}`);
}