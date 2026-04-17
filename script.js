const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const pl1score = document.getElementById("scorePl1");
const pl2score = document.getElementById("scorePl2");
const gameBoard = document.getElementById("tiktaktoe");
const newMatch = document.getElementById("newMatch");
const newGame = document.getElementById("newGame");
const form = document.getElementById("form");

function createGame() {  
    let players = [];
    let game = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ]
    let winner = "none";
    let moves = 0;

    function check(X, Y, incX, incY){
        let pos1 = game[X][Y];
        let pos2 = game[X + incX][Y + incY];
        let pos3 = game[X + 2 * incX][Y + 2 * incY];

        if(pos1 === pos2 && pos1 === pos3 && pos1 != 0){
        
            winner = players[pos1 - 1];
            return true;
        }   
         
        return false;
    }

    return {
        checkGame: function() {
            return  (check(0,0,0,1) ||
                check(1,0,0,1) ||
                check(2,0,0,1) ||
                check(0,0,1,0) ||
                check(0,1,1,0) ||
                check(0,2,1,0) ||
                check(0,0,1,1) ||
                check(2,2,-1,-1));
                
            
        },
        getGame: function() {
            return game;
        },
        addPlayer: function (name) {
            (players.length < 2)? players.push(name): alert("Already two players in the game");
            
        },
        makeMove: function (move) {
            let player = moves % 2;
            
            game[move[0]][move[1]] = player + 1;
            moves++;

        },

    };

};

function createPlayer(name){
    let playerScore = 0;

    return {
        getScore: function(){
            return playerScore;
        },
        increaseScore: function(){
            playerScore++;
        },
        getName: function(){
            return name;
        },
    };
};

let Game, Player1, Player2;


for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        const field = document.createElement("button");
        field.dataset.row = i;
        field.dataset.column = j;

        field.addEventListener('click', () => {
            const gameCopy = Game.getGame;
            if(gameCopy[i][j] === 0){
                Game.makeMove([i, j])
            }
        });
    };
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    Game = createGame();
    Player1 = createPlayer(data.get("pl1name"));
    Player2 = createPlayer(data.get("pl2name"));

    Game.addPlayer(Player1.getName());
    Game.addPlayer(Player2.getName());

    form.style.visibility = "hidden";

});













