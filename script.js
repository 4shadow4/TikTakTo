const player1 = document.getElementById("Player1");
const player2 = document.getElementById("Player2");
const pl1score = document.getElementById("scorePl1");
const pl2score = document.getElementById("scorePl2");
const gameBoard = document.getElementById("tiktaktoe");
const newMatch = document.getElementById("newMatch");
const newGame = document.getElementById("newGame");
const form = document.getElementById("form");
const startBackground = document.getElementById("startGame");

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
        checkField: function (x,y) {
            return game[x][y] === 0;
        },

        getPlayersTurn: function(){
            return moves % 2;
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

function initiateGame(PlayerName1, PlayerName2) {
    let Game, Player1, Player2;

    Game = createGame();

    Player1 = createPlayer(PlayerName1);
    Player2 = createPlayer(PlayerName2);

    Game.addPlayer(Player1.getName());
    Game.addPlayer(Player2.getName());

    player1.textContent = Player1.getName();
    player2.textContent = Player2.getName();
    pl1score.textContent = Player1.getScore();
    pl2score.textContent = Player2.getScore();

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            const field = document.createElement("button");

            field.dataset.row = i;
            field.dataset.column = j;

            field.addEventListener('click', () => {

                if(Game.checkField(field.dataset.row, field.dataset.column)){

                    const icon = document.createElement("img");

                    if(Game.getPlayersTurn()){
                        icon.src = "./Images/circle.png";
                    } else {
                        icon.src = "./Images/close.png";
                    }

                    Game.makeMove([i, j])

                    field.appendChild(icon);

                    if(Game.checkGame()){
                        gameBoard.replaceChildren();
                        startBackground.style.visibility = "visible";
                    }
                }

            });

            gameBoard.append(field);
        };
    };
}



form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    
    initiateGame(data.get("pl1name"), data.get("pl2name"));

    startBackground.style.visibility = "hidden";
    form.reset();

});













