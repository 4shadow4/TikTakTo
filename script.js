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
        printGame: function() {
            console.log(game);
            console.log({ winner, });
        },
        addPlayer: function (name) {
            (players.length < 2)? players.push(name): alert("Already two players in the game");
            
        },
        makeMove: function () {
            let player = moves % 2;
            let move = prompt(`${players[player]} make your move!`).split(" ").map(a => Number(a) - 1);

            while(game[move[0]][move[1]] != 0 ){
                move = prompt(`${players[player]} this field is already taken!`).split(" ").map(a => Number(a) - 1);
            }
            
            game[move[0]][move[1]] = player + 1;
            moves++;

        },

    }

}

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
    }
}

const Game1 = createGame();
const Player1 = createPlayer(prompt("Input Name Player1"));
const Player2 = createPlayer(prompt("Input Name Player2"));

Game1.addPlayer(Player1.getName());
Game1.addPlayer(Player2.getName());
Game1.printGame();

while(!Game1.checkGame()){
    Game1.makeMove();
    Game1.printGame();
}
Game1.printGame();







