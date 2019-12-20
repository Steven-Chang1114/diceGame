/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentScore, currentPlayer;

scores = [0,0];
currentScore = 0;
currentPlayer = 0;

document.querySelector(".dice").style.display = "none";

document.getElementById("score-0").textContent = 0;
document.getElementById("score-1").textContent = 0;
document.getElementById("current-0").textContent = 0;
document.getElementById("current-1").textContent = 0;

document.querySelector(".btn-roll").addEventListener("click", function(){
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
});


document.querySelector(".btn-hold").addEventListener("click", function(){
    scores[currentPlayer] += currentScore;
    document.getElementById("score-"+ currentPlayer).textContent = scores[currentPlayer];

    switchPlayer();

});

function switchPlayer() {
    currentScore = 0;
    document.querySelector("#current-" + currentPlayer).textContent = currentScore;
    currentPlayer == 0 ? currentPlayer = 1 : currentPlayer = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}