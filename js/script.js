const hangmanImg = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text span");
const keyboard = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuess = 6;

const generateKeyboard = () => {
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.classList.add("key");
  }
};

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;

  hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;
  buttons.forEach((btn) => (btn.disabled = false));

  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");

  gameModal.classList.remove("show");
};

const getRandomWords = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

  currentWord = word.toLowerCase();

  document.querySelector(".hint-text span").innerText = hint;

  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `Você encontrou a palavra:`
      : `A palavra certa era:`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Parabéns!" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <strong>${currentWord}</strong>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;

  if (wrongGuessCount === maxGuess) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

generateKeyboard();

const buttons = document.querySelectorAll(".key");

buttons.forEach((btn) => {
  document.addEventListener(
    "keydown",
    (e) => {
      let key = e.key;
      if (key === btn.innerHTML) {
        if (gameModal.classList.contains("show")) {
          return;
        }
        btn.click();
      }
    },
    false
  ),
    btn.addEventListener("click", (e) => initGame(e.target, btn.innerHTML));
});

getRandomWords();

playAgainBtn.addEventListener("click", getRandomWords);
