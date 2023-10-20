/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const wordList_1 = __importDefault(__webpack_require__(/*! ./wordList */ "./src/wordList.ts"));
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
    const { word, hint } = wordList_1.default[Math.floor(Math.random() * wordList_1.default.length)];
    currentWord = word.toLowerCase();
    const hintSpan = document.querySelector(".hint-text span");
    hintSpan.innerText = hint;
    resetGame();
};
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory
            ? `Você encontrou a palavra:`
            : `A palavra certa era:`;
        const gameModalImg = gameModal.querySelector("img");
        gameModalImg.src = `images/${isVictory ? "victory" : "lost"}.gif`;
        const gameModalH4 = gameModal.querySelector("h4");
        gameModalH4.innerText = `${isVictory ? "Parabéns!" : "Game Over!"}`;
        const gameModalP = gameModal.querySelector("p");
        gameModalP.innerHTML = `${modalText} <strong>${currentWord}</strong>`;
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
    }
    else {
        wrongGuessCount++;
        hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;
    if (wrongGuessCount === maxGuess)
        return gameOver(false);
    if (correctLetters.length === currentWord.length)
        return gameOver(true);
};
generateKeyboard();
const buttons = document.querySelectorAll(".key");
buttons.forEach((btn) => {
    document.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key === btn.innerHTML) {
            if (gameModal.classList.contains("show")) {
                return;
            }
            btn.click();
        }
    }, false),
        btn.addEventListener("click", (e) => initGame(e.target, btn.innerHTML));
});
getRandomWords();
playAgainBtn.addEventListener("click", getRandomWords);


/***/ }),

/***/ "./src/wordList.ts":
/*!*************************!*\
  !*** ./src/wordList.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const wordList = [
    { word: "viagem", hint: "Exploração de novos lugares." },
    { word: "café", hint: "Bebida quente e estimulante." },
    { word: "montanha", hint: "Elevação natural da terra." },
    { word: "rima", hint: "Palavras com sons semelhantes." },
    { word: "pintura", hint: "Arte de criar imagens visuais." },
    { word: "coração", hint: "Órgão que bombeia sangue." },
    { word: "paraíso", hint: "Lugar perfeito e harmonioso." },
    { word: "família", hint: "Parentes próximos e queridos." },
    { word: "escola", hint: "Local de aprendizado." },
    { word: "dinheiro", hint: "Meio de troca e pagamento." },
    { word: "folha", hint: "Parte verde de uma planta." },
    { word: "tempo", hint: "A medida das horas." },
    { word: "fogo", hint: "Uma forma de energia." },
    { word: "arco-íris", hint: "Uma mistura colorida no céu." },
    { word: "cidade", hint: "Grande área urbana." },
    { word: "amor", hint: "Sentimento profundo de afeição." },
    { word: "livro", hint: "Uma coleção de histórias escritas." },
    { word: "felicidade", hint: "Estado de alegria e contentamento." },
    { word: "computador", hint: "Máquina que processa informações." },
    { word: "chuva", hint: "Gotas de água que caem do céu." },
    { word: "praia", hint: "Litoral com areia e água do mar." },
    { word: "restaurante", hint: "Local para refeições." },
    { word: "sorriso", hint: "Expressão facial de alegria." },
    { word: "mundo", hint: "O planeta Terra." },
    { word: "cachorro", hint: "Animal de estimação leal." },
    { word: "guitarra", hint: "Instrumento musical de cordas." },
    { word: "amarelo", hint: "Cor brilhante e quente." },
    { word: "fotografia", hint: "Arte de capturar imagens." },
    { word: "amigo", hint: "Pessoa próxima e confiável." },
    { word: "coração", hint: "Órgão que bombeia sangue." },
    { word: "viagem", hint: "Exploração de novos lugares." },
    { word: "café", hint: "Bebida quente e estimulante." },
    { word: "montanha", hint: "Elevação natural da terra." },
    { word: "rima", hint: "Palavras com sons semelhantes." },
    { word: "pintura", hint: "Arte de criar imagens visuais." },
    { word: "coração", hint: "Órgão que bombeia sangue." },
    { word: "paraíso", hint: "Lugar perfeito e harmonioso." },
    { word: "família", hint: "Parentes próximos e queridos." },
    { word: "escola", hint: "Local de aprendizado." },
    { word: "dinheiro", hint: "Meio de troca e pagamento." },
    { word: "folha", hint: "Parte verde de uma planta." },
    { word: "tempo", hint: "A medida das horas." },
    { word: "fogo", hint: "Uma forma de energia." },
    { word: "arco-íris", hint: "Uma mistura colorida no céu." },
    { word: "cidade", hint: "Grande área urbana." },
    { word: "amor", hint: "Sentimento profundo de afeição." },
    { word: "livro", hint: "Uma coleção de histórias escritas." },
    { word: "felicidade", hint: "Estado de alegria e contentamento." },
    { word: "computador", hint: "Máquina que processa informações." },
    { word: "chuva", hint: "Gotas de água que caem do céu." },
    { word: "praia", hint: "Litoral com areia e água do mar." },
    { word: "restaurante", hint: "Local para refeições." },
    { word: "sorriso", hint: "Expressão facial de alegria." },
    { word: "mundo", hint: "O planeta Terra." },
    { word: "cachorro", hint: "Animal de estimação leal." },
    { word: "guitarra", hint: "Instrumento musical de cordas." },
    { word: "amarelo", hint: "Cor brilhante e quente." },
    { word: "fotografia", hint: "Arte de capturar imagens." },
    { word: "amigo", hint: "Pessoa próxima e confiável." },
    { word: "coração", hint: "Órgão que bombeia sangue." },
    { word: "viagem", hint: "Exploração de novos lugares." },
    { word: "café", hint: "Bebida quente e estimulante." },
    { word: "montanha", hint: "Elevação natural da terra." },
    { word: "rima", hint: "Palavras com sons semelhantes." },
    { word: "pintura", hint: "Arte de criar imagens visuais." },
    { word: "computador", hint: "Máquina que processa informações." },
    { word: "chuva", hint: "Gotas de água que caem do céu." },
    { word: "paraíso", hint: "Lugar perfeito e harmonioso." },
    { word: "família", hint: "Parentes próximos e queridos." },
    { word: "escola", hint: "Local de aprendizado." },
    { word: "dinheiro", hint: "Meio de troca e pagamento." },
    { word: "folha", hint: "Parte verde de uma planta." },
    { word: "tempo", hint: "A medida das horas." },
    { word: "fogo", hint: "Uma forma de energia." },
    { word: "arco-íris", hint: "Uma mistura colorida no céu." },
    { word: "cidade", hint: "Grande área urbana." },
    { word: "amor", hint: "Sentimento profundo de afeição." },
    { word: "livro", hint: "Uma coleção de histórias escritas." },
    { word: "felicidade", hint: "Estado de alegria e contentamento." },
    { word: "computador", hint: "Máquina que processa informações." },
    { word: "chuva", hint: "Gotas de água que caem do céu." },
    { word: "praia", hint: "Litoral com areia e água do mar." },
    { word: "restaurante", hint: "Local para refeições." },
    { word: "sorriso", hint: "Expressão facial de alegria." },
    { word: "mundo", hint: "O planeta Terra." },
    { word: "cachorro", hint: "Animal de estimação leal." },
    { word: "guitarra", hint: "Instrumento musical de cordas." },
    { word: "amarelo", hint: "Cor brilhante e quente." },
    { word: "fotografia", hint: "Arte de capturar imagens." },
    { word: "amigo", hint: "Pessoa próxima e confiável." },
];
exports["default"] = wordList;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map