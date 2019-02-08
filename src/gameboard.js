import data from './data.js';
import $ from 'jquery';
import domUpdates from './domUpdates.js';

import Clue from './clue.js';

class Gameboard {
  constructor(round, categoryList) {
    this.round = round || 1;
    this.categoryList = Object.keys(data.categories);
    this.cluesWithCategories = [];
    this.roundClues = [];
    this.finalRoundClue = [];
    this.roundCategories = [];
    this.finalRoundCategory = [];
    this.playersArray = [];
    this.activePlayer = 0;
    this.turnCount = 0;
    this.doubleCount = [];
    this.currentClue = {};
    this.currentLocation = 0;
  }

  playerScore(answer, score) {
    let activePlayer = this.playersArray[this.activePlayer];
    let activePlayerIndex = this.playersArray.indexOf(activePlayer);
    activePlayer.updateScore(answer, score, activePlayer, activePlayerIndex);
    this.turnCount++;
    this.checkTurnCount();
  }

  checkTurnCount() {
    if (this.turnCount === 3 && this.round === 1) {
      this.round++;
      this.changeRound2();
    } else if (this.turnCount === 3 && this.round === 2) {
      this.round++;
      this.finalJeopardy();
    } else {
      this.changePlayerTurn();
    }
  }

  finalJeopardy() {
    domUpdates.disableAllClues();
    domUpdates.removeCategories();
    this.turnCount = 0;
    this.changePlayerTurn()
    let clue = new Clue();
    let selectedClue = this.finalRoundClue[3];
    // let dailydouble = new Dailydouble;
    $('.wager-head').text('Final Jeopardy!');
    // dailydouble.giveDouble(selectedClue);
    clue.showClue(selectedClue);
    this.currentClue = selectedClue;
    domUpdates.populateClueCard(selectedClue);
  }

  startGame() {
    // let dailydouble = new Dailydouble;
    // let DD1 = dailydouble.doubleCountGenerator();
    // this.doubleCount.push(DD1);
    this.collectClues();
    this.assignCategories();
    this.calculateWager();
    domUpdates.activePlayerHighlight(this.activePlayer);
  }

  createPlayersArray(game, player1, player2, player3) {
    game.playersArray.push(player1);
    game.playersArray.push(player2);
    game.playersArray.push(player3);
    domUpdates.changePlayerNames(game)
  }

  collectClues() {
    let allClues = data.clues;
    this.cluesWithCategories = allClues.map( clue => {
      clue.categoryName = this.categoryList[clue.categoryId - 1]
        .replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
      return clue;
    });
  }

  selectCorrectClue(e) {
    let clue = new Clue();
    let selectedClueLocation = e.target.id;
    let selectedClue = this.roundClues[selectedClueLocation];
    if (e.target.className.includes('available-box')) {
      if (this.doubleCount[0] === this.turnCount || 
        this.doubleCount[1] === this.turnCount) {
        // let dailydouble = new Dailydouble;
        // dailydouble.giveDouble(selectedClue);
      }
      clue.showClue(selectedClue);
      this.currentClue = selectedClue;
      this.currentLocation = selectedClueLocation;
    }
    if (e.target.className.includes('wager-btn')) {
      let $wagerAmount = $('#wagerInput').val();
      currentClue.pointValue = parseInt($wagerAmount);
      domUpdates.reassignPointValue($wagerAmount);
      domUpdates.removeWagerCard();
    }
    if (e.target.className.includes('answer-btn')) {
      let $playerAnswer = $('#playerAnswer').val();
      domUpdates.disableClue(this.currentLocation);
      clue.checkAnswer(this, this.currentClue, $playerAnswer);
    }
  }

  selectFinalJeopardy(e) {
    let clue = new Clue();
    let selectedClue = this.finalRoundClue[2];
    // let dailydouble = new Dailydouble;
    $('.wager-head').text('Final Jeopardy!')
    // dailydouble.giveDouble(selectedClue);
    clue.showClue(selectedClue);
    currentClue = selectedClue;
    domUpdates.populateClueCard(selectedClue);
    if (e.target.className.includes('answer-btn')) {
      let $playerAnswer = $('#playerAnswer').val();
      clue.checkAnswer(this, currentClue, $playerAnswer);
    }
    if (e.target.className.includes('wager-btn')) {
      let $wagerAmount = $('#wagerInput').val();
      currentClue.pointValue = parseInt($wagerAmount);
      domUpdates.reassignPointValue($wagerAmount);
      domUpdates.removeWagerCard();
    }
    if (this.turnCount === 3 ) {
    }
  }

  assignCategories() {    
    function randomize(array) {
      array = array.sort(() => 0.5 - Math.random());
      return array;
    }
    let category10GameClues = []
    let clues10 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 10
    });
    randomize(clues10);
    for (var i = 1; i < 5; i++) {
      let foundClue = clues10.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category10GameClues.push(foundClue);
    }  
    this.roundClues.push(category10GameClues);

    let clues9 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 9
    });
    randomize(clues9);
    let category9GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues9.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category9GameClues.push(foundClue);
    }  
    this.roundClues.push(category9GameClues);

    let clues8 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 8
    });
    randomize(clues8);
    let category8GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues8.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category8GameClues.push(foundClue);
    }  
    this.roundClues.push(category8GameClues);

    let clues7 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 7
    });
    randomize(clues7);
    let category7GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues7.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category7GameClues.push(foundClue);
    }  
    this.roundClues.push(category7GameClues);

    let clues6 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 6
    });
    randomize(clues6);
    let category6GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues6.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category6GameClues.push(foundClue);
    }  
    this.roundClues.push(category6GameClues);

    let clues5 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 5
    });
    randomize(clues5);
    let category5GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues5.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category5GameClues.push(foundClue);
    }  
    this.roundClues.push(category5GameClues);

    let clues4 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 4
    });
    randomize(clues4);
    let category4GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues4.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category4GameClues.push(foundClue);
    }  
    this.roundClues.push(category4GameClues);

    let clues3 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 3
    });
    randomize(clues3);
    let category3GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues3.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category3GameClues.push(foundClue);
    }  
    this.roundClues.push(category3GameClues);

    this.roundClues = this.roundClues.flat();

    let clues2 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 2
    });
    randomize(clues2);
    let category2GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues2.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category2GameClues.push(foundClue);
    }  
    this.finalRoundClue.push(category2GameClues);

    this.finalRoundClue = this.finalRoundClue.flat();

    let clues1 = this.cluesWithCategories.filter(clue => {
      return clue.categoryId === 1
    });
    randomize(clues1);
    let category1GameClues = []
    for (var i = 1; i < 5; i++) {
      let foundClue = clues1.find(function(el) {
        return el.pointValue === 100 * i;
      });
       category1GameClues.push(foundClue);
    }  

    this.roundCategories = [this.roundClues[0].categoryName,
      this.roundClues[4].categoryName,
      this.roundClues[8].categoryName,
      this.roundClues[12].categoryName]
    domUpdates.labelCategories([this.roundCategories]);
  }

  changePlayerTurn() {
    switch (this.activePlayer) {
    case 0:
      domUpdates.deactivatePlayerHighlight(this.activePlayer);
      this.activePlayer = 1;
      domUpdates.activePlayerHighlight(this.activePlayer);
      break;
    case 1:
      domUpdates.deactivatePlayerHighlight(this.activePlayer);
      this.activePlayer = 2;
      domUpdates.activePlayerHighlight(this.activePlayer);
      break;
    case 2:
      domUpdates.deactivatePlayerHighlight(this.activePlayer);
      this.activePlayer = 0;
      domUpdates.activePlayerHighlight(this.activePlayer);
      break;
    default:
    }
  }

  changeRound2() {
    // this.doubleCount.pop();
    // let dailydouble = new Dailydouble;
    // let DD1 = dailydouble.doubleCountGenerator();
    // let DD2 = dailydouble.doubleCountGenerator();
    // this.doubleCount.push(DD1);
    // this.doubleCount.push(DD2);
    this.roundClues.splice(0, 16);
    this.roundClues.forEach((clue) => {
      clue.pointValue = clue.pointValue * 2;
    });
    domUpdates.setClueBoxPoints();
    this.roundCategories = [this.roundClues[0].categoryName, 
      this.roundClues[4].categoryName, 
      this.roundClues[8].categoryName, 
      this.roundClues[12].categoryName];
    domUpdates.roundTwoDisplay();  
    domUpdates.labelCategories([this.roundCategories]);
    domUpdates.repopulateClues();
    this.turnCount = 0
    this.changePlayerTurn();
  }

  calculateWager() {
    let highestPointValue = 400;
    if (this.round === 2) {
      highestPointValue = 800
    } else if (this.round === 3) {
      highestPointValue = this.activePlayer.score
    }
    let wagerMin = 5;
    let wagerMax = highestPointValue;
  } 
}
export default Gameboard;