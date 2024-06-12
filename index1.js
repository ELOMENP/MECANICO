const words = ["casa", "perro", "gato", "sol", "luz", "mar", "nube", "piedra", "flor", "llama", "auto", "pasto"];
let score = 0;

const gameContainer = document.getElementById('game-container');
const wordsContainer = document.getElementById('words-container');
const inputBox = document.getElementById('input-box');
const scoreDisplay = document.getElementById('score');

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function createWordElement(word) {
    const wordElement = document.createElement('div');
    wordElement.classList.add('word');
    wordElement.innerText = word;
    wordElement.style.left = `${Math.random() * (gameContainer.clientWidth - 100)}px`;
    wordElement.style.top = '0px';
    return wordElement;
}

function addWordToGame() {
    const word = getRandomWord();
    const wordElement = createWordElement(word);
    wordsContainer.appendChild(wordElement);
    moveWordDown(wordElement);
}

function moveWordDown(wordElement) {
    let top = 0;
    const interval = setInterval(() => {
        top += 2;
        wordElement.style.top = `${top}px`;

        if (top > gameContainer.clientHeight - 30) {
            clearInterval(interval);
            wordsContainer.removeChild(wordElement);
            alert("¡Perdiste!");
            window.location.reload();
        }
    }, 50); // Increased the interval frequency for smoother movement
}

inputBox.addEventListener('input', () => {
    const inputText = inputBox.value.trim().toLowerCase();
    const wordElements = document.querySelectorAll('.word');
    wordElements.forEach(wordElement => {
        if (wordElement.innerText.toLowerCase() === inputText) {
            wordsContainer.removeChild(wordElement);
            inputBox.value = '';
            score += 10;
            scoreDisplay.innerText = `Puntuación: ${score}`;
        }
    });
});

setInterval(addWordToGame, 2000);
