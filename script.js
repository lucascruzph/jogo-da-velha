const board = document.getElementById("board");
const cells = [];
let currentPlayer = "X";
let gameWon = false;

// Crie o tabuleiro do jogo
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    board.appendChild(cell);

    cell.addEventListener("click", () => {
        if (!gameWon && cell.textContent === "") {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
}

// Botão de reinício
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
    resetGame();
});

// Elemento de mensagem
const messageElement = document.getElementById("message");

// Define as combinações vencedoras
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*
// Verifica se há um vencedor
function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            gameWon = true;
            showMessage(`Vitória do ${currentPlayer}`);
            setTimeout(resetGame, 5000);
            return;
        }
    }
    if (!cells.some(cell => cell.textContent === "")) {
        showMessage("Empate");
        setTimeout(resetGame, 5000);
    }
}
*/

//Uma função que Exibe uma mensagem em um popup
function showMessage(text) {
    messageElement.textContent = text;
    messageElement.classList.remove("hidden");
}


// Reinicia o jogo
function resetGame() {
    for (const cell of cells) {
        cell.textContent = "";
        cell.classList.remove("X", "O", "winner");
    }
    gameWon = false;
    currentPlayer = "X";
    messageElement.textContent = "";
    messageElement.classList.add("hidden");
}

// ... (código anterior)

// Variáveis para rastrear as contagens
let xWins = 0;
let oWins = 0;
let ties = 0;

// Elementos para exibir as contagens
const xScoreElement = document.getElementById("x-score");
const oScoreElement = document.getElementById("o-score");
const tieScoreElement = document.getElementById("tie-score");

// Função para atualizar as contagens no HTML
function updateScores() {
    xScoreElement.textContent = `Vitórias do X: ${xWins}`;
    oScoreElement.textContent = `Vitórias do Círculo: ${oWins}`;
    tieScoreElement.textContent = `Empates: ${ties}`;
}

// Verifica se há um vencedor
function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            gameWon = true;
            if (currentPlayer === "X") {
                xWins++;
            } else {
                oWins++;
            }
            showMessage(`Vitória do ${currentPlayer}`);
            updateScores();
            //setTimeout(resetGame, 5000);
            return;
        }
    }
    if (!cells.some(cell => cell.textContent === "")) {
        ties++;
        showMessage("Empate");
        updateScores();
        setTimeout(resetGame, 5000);
    }
}

// ... (código posterior)
