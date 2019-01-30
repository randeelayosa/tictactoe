function Player(letter) {
  this.letter = letter;
  active = false;
  id = 0;
}

var player1 = new Player("X");
player1.active = true;
var player2 = new Player("O");

var gameboard =
  [0,1,2
  ,3,4,5,
  6,7,8];

const winCombos = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

function swapActive() {
  if(player1.active === true) {
    player1.active = false;
    player2.active = true;
  } else {
    player1.active = true;
    player2.active = false;
  }
}

function activePlayer (){
  if(player1.active === true) {
    return player1;
  }
    return player2;
}

function checkWin(id) {
  var wins = winCombos;
  wins = wins.filter(function(arr) {
    if(arr.includes(parseInt(id))) {
      return true;
    } else {
      return false;
    }
  });

  var winner = false;
   wins.forEach(function(arr) {
    if(gameboard[arr[0]] === gameboard[arr[1]] && gameboard[arr[0]] === gameboard[arr[2]]) {
      winner = true;
    }
  })
  return winner;
}

var count = 0;
function attachContactListeners() {
  $(".container").on("click", ".col-md-4", function() {
    var len = $("." + $(this).attr("id")).text().length;
    if(len < 1){
      count++;
      $("." + $(this).attr("id")).text(activePlayer().letter);
      gameboard[$(this).attr("id")] = activePlayer().letter;

      if(checkWin($(this).attr("id")) === true){
        $("p").text(activePlayer().letter + " wins");
      }else{
        if(count === 9){
          $("p").text("Nobody wins");
        }
      }
      swapActive();
    }
  });
};

$(document).ready(function() {
  attachContactListeners();
})
