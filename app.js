/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, currentScore, currentPlayer, gameScope, lastDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if (gameScope){
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        var diceDOM = document.querySelector(".dice");
        var dice1DOM = document.querySelector(".dice1");

        diceDOM.style.display = "block";
        diceDOM.src = "dice-"+dice+".png";

        dice1DOM.style.display = "block";
        dice1DOM.src = "dice-"+dice1+".png";

        if (dice == 6 && lastDice == 6){
            currentScore = 0;
            scores[currentPlayer] = 0;
            document.getElementById("score-"+currentPlayer).textContent = 0;
            document.getElementById("current-"+currentPlayer).textContent = 0;
            switchPlayer();
        }else if(dice != 1 && dice1 != 1){
            currentScore += (dice + dice1);
            document.querySelector("#current-" + currentPlayer).textContent = currentScore;
        }else{
            //scores[currentPlayer] += currentScore;
            //document.querySelector("#score-"+currentPlayer).textContent = scores[currentPlayer];
        
            switchPlayer();
        }

        lastDice = dice;
    } 
});


document.querySelector(".btn-hold").addEventListener("click", function(){
    if (gameScope){
        scores[currentPlayer] += currentScore;
        document.getElementById("score-"+ currentPlayer).textContent = scores[currentPlayer];
        var scoreSet = document.querySelector(".set-score").value;

        if (scores[currentPlayer] >= scoreSet) {
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
    document.querySelector(".dice1").style.display = "none";

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
    document.querySelector(".dice1").style.display = "none";
}