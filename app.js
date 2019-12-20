/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentScore, currentPlayer, gameScope;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gameScope){
        var dice = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-"+dice+".png";

        if (dice != 1){
            currentScore += dice;
            document.querySelector("#current-" + currentPlayer).textContent = currentScore;
        }else{
            //scores[currentPlayer] += currentScore;
            //document.querySelector("#score-"+currentPlayer).textContent = scores[currentPlayer];
        
            switchPlayer();
        }
    } 
});


document.querySelector(".btn-hold").addEventListener("click", function(){
    if (gameScope){
        scores[currentPlayer] += currentScore;
        document.getElementById("score-"+ currentPlayer).textContent = scores[currentPlayer];

        if (scores[currentPlayer] >= 100) {
            document.getElementById("name-" + currentPlayer).textContent = "WINNER";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + currentPlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + currentPlayer + "-panel").classList.remove("active");
            currentScore = 0;
            gameScope = false;
        }else{
            switchPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    gameScope = true;
    scores = [0,0];
    currentScore = 0;
    currentPlayer = 0;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
}

function switchPlayer() {
    currentScore = 0;
    document.querySelector("#current-" + currentPlayer).textContent = currentScore;
    currentPlayer == 0 ? currentPlayer = 1 : currentPlayer = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}