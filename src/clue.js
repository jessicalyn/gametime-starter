import domUpdates from './domUpdates.js'

// import Gameboard from './gameboard.js' //cannot import

class Clue {
  constructor(answer, categoryId, categoryName, pointValue, question) {
    this.answer = answer;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.pointValue = pointValue;
    this.question = question;
  }

  showClue(selectedClue) {
    domUpdates.populateClueCard(selectedClue);
  }

  checkAnswer(game, selectedClue, playerAnswer) {
    console.log("SELECTED CLUE", selectedClue);
    if (selectedClue.answer.toLowerCase() === playerAnswer.toLowerCase()) {
      domUpdates.correctFeedback();
      let answer = "correct";
      game.playerScore(answer, selectedClue.pointValue);
    } else {
      domUpdates.incorrectFeedback();
      let answer = "wrong";
      game.playerScore(answer, selectedClue.pointValue);
    }
  }
}



export default Clue;