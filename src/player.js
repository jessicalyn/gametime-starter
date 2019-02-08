import domUpdates from './domUpdates.js'

class Player {
  constructor(name, score, wager) {
    this.name = name;
    this.score = score;
  }

  updateScore(answer, score, activePlayer, activePlayerIndex) {
    if (answer === "correct") {
      activePlayer.score += score;
    } else {
      activePlayer.score -= score;
      score = activePlayer.score;
    }
    domUpdates.updatePlayerScore(this.activePlayer, score, activePlayerIndex);
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
