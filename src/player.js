class Player {
  constructor(name, score, wager) {
    this.name = name;
    this.score = score;
  }

  updateScore(resultScore) {
    this.score += resultScore;
  }

  wagerRange() {
  }
}


export default Player;


// if (answer === "correct") {
//       activePlayer.score += score;
//     } else {
//       activePlayer.score -= score;
//     }
//     domUpdates.updatePlayerScore(this.activePlayer, activePlayer.score);
//     this.turnCount++;
//     this.checkTurnCount();
