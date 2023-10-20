import wordList from "./wordList";

const hangmanImg = document.querySelector(
  ".hangman-box img",
) as HTMLImageElement;
const wordDisplay = document.querySelector(".word-display") as HTMLUListElement;
const guessesText = document.querySelector(
  ".guesses-text span",
) as HTMLSpanElement;
const keyboard = document.querySelector(".keyboard") as HTMLInputElement;
const gameModal = document.querySelector(".game-modal") as HTMLDivElement;
const playAgainBtn = document.querySelector(".play-again") as HTMLButtonElement;

let currentWord: string, correctLetters: Array<string>, wrongGuessCount: number;
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
  const hintSpan = document.querySelector(".hint-text span") as HTMLSpanElement;

  hintSpan.innerText = hint;

  resetGame();
};

const gameOver = (isVictory: boolean) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `Você encontrou a palavra:`
      : `A palavra certa era:`;

    const gameModalImg = gameModal.querySelector("img") as HTMLImageElement;
    gameModalImg.src = `images/${isVictory ? "victory" : "lost"}.gif`;

    const gameModalH4 = gameModal.querySelector("h4") as HTMLHeadingElement;
    gameModalH4.innerText = `${isVictory ? "Parabéns!" : "Game Over!"}`;

    const gameModalP = gameModal.querySelector("p") as HTMLParagraphElement;
    gameModalP.innerHTML = `${modalText} <strong>${currentWord}</strong>`;

    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button: HTMLButtonElement, clickedLetter: string) => {
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

const buttons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".key");

buttons.forEach((btn) => {
  document.addEventListener(
    "keydown",
    (e) => {
      const key = e.key;
      if (key === btn.innerHTML) {
        if (gameModal.classList.contains("show")) {
          return;
        }
        btn.click();
      }
    },
    false,
  ),
    btn.addEventListener("click", (e) =>
      initGame(e.target as HTMLButtonElement, btn.innerHTML),
    );
});

getRandomWords();

playAgainBtn.addEventListener("click", getRandomWords);
