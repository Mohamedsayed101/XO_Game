let playerX = document.createElement("input");
let playerO = document.createElement("input");
let Done = document.createElement("button");
let scoreScreen = document.getElementById("score");
let cells = document.querySelectorAll('.cell');

// Game state
let currentPlayer = 'X';
let gameActive = false;
let scores = { X: 0, O: 0 };
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning conditions
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

window.onload = function () {
    let message = document.createElement("div");
    message.textContent = "🎮 Enter player names to start the game!";
    message.style.cssText = "background-color: #4CAF50; color: white; padding: 15px; margin: 20px auto; text-align: center; border-radius: 10px; width: fit-content; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; align-items: center;";
    
    // Set up input fields
    playerX.placeholder = "Enter Player (X)";
    playerX.id = "X";
    playerX.style.cssText = "margin: 10px; padding: 10px; font-size: 16px; border-radius: 5px;";
    
    playerO.placeholder = "Enter Player (O)";
    playerO.id = "O";
    playerO.style.cssText = "margin: 10px; padding: 10px; font-size: 16px; border-radius: 5px;";

    Done.textContent = "Done";
    Done.id = "done-btn";
    Done.style.cssText = "padding: 10px 20px; font-size: 16px; background-color: #2196F3; color: #fff; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;";

    // Add elements to message
    message.appendChild(playerX);
    message.appendChild(playerO);
    message.appendChild(Done);
    document.body.appendChild(message);
  
    // On Done click
    Done.onclick = function () {
        if (!playerX.value.trim() || !playerO.value.trim()) {
            alert("Please enter names for both players!");
            return;
        }
        
        playerX.disabled = true;
        playerO.disabled = true;
        Done.disabled = true;
        
        // Display start message
        message.textContent = `🎉 Good luck, ${playerX.value} (X) vs ${playerO.value} (O)!`;
        message.style.backgroundColor = "#673AB7";

        // Initialize score display
        displayScore(0, 0);
        
        // Start the game after a delay
        setTimeout(() => {
            message.style.display = "none";
            gameActive = true;
            addIntoCell();
        }, 1000);
    };
};

function displayScore(scoreX, scoreO) {
    scoreScreen.style.display = 'block';  
    scoreScreen.innerHTML = `
        <p class="player">${playerX.value} (X): ${scoreX}</p>
        <p class="player">${playerO.value} (O): ${scoreO}</p>
    `;
}

function addIntoCell() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });
}

function handleCellClick(cell, index) {
    if (!gameActive || gameState[index] !== "") return;

    // Update game state and UI
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');

    // Check for winner or draw
    const winner = checkWinner();
    if (winner) {
        handleWin(winner);
        return;
    } else if (!gameState.includes("")) {
        handleDraw();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
}

function handleWin(winner) {
    gameActive = false;
    scores[winner]++;
    displayScore(scores.X, scores.O);
    
    // Show win message
    const winnerName = winner === 'X' ? playerX.value : playerO.value;
    setTimeout(() => {
        alert(`🎉 ${winnerName} (${winner}) wins!`);
        resetGame();
    }, 100);
}

function handleDraw() {
    gameActive = false;
    setTimeout(() => {
        alert("Game ended in a draw!");
        resetGame();
    }, 100);
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("player-x", "player-o");
    });
    gameActive = true;
}