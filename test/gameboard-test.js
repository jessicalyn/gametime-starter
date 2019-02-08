import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import Gameboard from '../src/gameboard.js';
import domUpdates from '../src/domUpdates.js';
import Player from '../src/player.js';

describe('Gameboard', function() {
  let game;

  beforeEach(function() {
    chai.spy.on(domUpdates, ['startGame', 'assignCategories', 'activePlayerHighlight', 'changePlayerNames', 'deactivatePlayerHighlight', 'repopulateClues', 'labelCategories', 'roundTwoDisplay', 'setClueBoxPoints'], () => true);
    game = new Gameboard();
  });

  afterEach(function() {
    chai.spy.restore(domUpdates);
  });

  it('should instantiate a new game', function() {
    expect(game).to.be.an.instanceof(Gameboard);
  })

  it('should have default properties', function() {
    expect(game.round).to.equal(1);
    expect(game.categoryList).to.deep.equal(["unitedStatesHistory", "lifeSciences", "publicHealth", "educationJargon", "nameThatBoardGame", "americanLiterature", "biographies", "americanCities", "food", "cableTV"]);
    expect(game.cluesWithCategories).to.deep.equal([]);
    expect(game.roundClues).to.deep.equal([]);
    expect(game.finalRoundClue).to.deep.equal([]);
    expect(game.roundCategories).to.deep.equal([]);
    expect(game.finalRoundCategory).to.deep.equal([]);
    expect(game.playersArray).to.deep.equal([]);
    expect(game.activePlayer).to.equal(0);
    expect(game.turnCount).to.equal(0);
    expect(game.doubleCount).to.deep.equal([]);
  });

  it('should start a game', function () {
    expect(game.doubleCount).to.have.length(0);
    game.startGame();
    expect(game.doubleCount).to.have.length(1);
  });  //Will not work without dailydouble functionality

  it('should create an array with all clue objects, including category name', function() {
    expect(game.cluesWithCategories).to.have.length(0);
    game.collectClues();
    expect(game.cluesWithCategories).to.have.length(114);
  });

  it('should create 2 arrays, one with playable categories, and one with the final round category', function() {
    game.collectClues();
    expect(game.roundCategories).to.deep.equal([]);
    // expect(game.finalRoundCategory).to.deep.equal([]);
    game.assignCategories(game.cluesWithCategories);
    expect(game.roundCategories).to.have.length(4);
    // expect(game.finalRoundCategory).to.have.length(1);
  });

  it('should create an array of all clues to be used during gameplay, and one for the fianl round clues to chose from', function() {
    expect(game.roundClues).to.have.length(0);
    expect(game.finalRoundClue).to.have.length(0);
    game.assignCategories();
    expect(game.roundClues).to.have.length(32);
    expect(game.finalRoundClue).to.have.length(4);
  });

  it('should create an array of the instantiated players', function() {
    expect(game.playersArray).to.deep.equal([]);
    let player1 = { name: 'Joe', score: 100 };
    let player2 = { name: 'Archie', score: 200 };
    let player3 = { name: 'Duder', score: 300 };
    game.createPlayersArray(game, player1, player2, player3);
    expect(game.playersArray).to.have.length(3);
  });

  it('should increase the turn count after a player answers', function() {
    let player1 = { name: 'Joe', score: 100 };
    let player2 = { name: 'Archie', score: 200 };
    let player3 = { name: 'Duder', score: 300 };
    game.createPlayersArray(game, player1, player2, player3);    
    expect(game.turnCount).to.equal(0);
    game.playerScore('correct', 100);
    expect(game.turnCount).to.equal(1);
    game.playerScore('correct', 100);
    expect(game.turnCount).to.equal(2);
  });

  it('should increase its round when turnCount reaches 16', function() {
    let activePlayer = { name: 'Joe', score: 0 };
    expect(game.round).to.equal(1);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    game.playerScore('correct', 100);
    expect(game.round).to.equal(2);
  });

  it('should check rounds and change at the appropriate turn count', function() {
    expect(game.round).to.equal(1);
    game.turnCount = 3;
    game.checkTurnCount();
    expect(game.round).to.equal(2);
  });


  it('should be able to switch active players', function() {
    let activePlayer = { name: 'Archie', score: 200 };
    expect(game.activePlayer).to.equal(0);
    game.startGame();
    expect(game.activePlayer).to.equal(0);
    game.changePlayerTurn();
    expect(game.activePlayer).to.equal(1);
    game.changePlayerTurn();
    expect(game.activePlayer).to.equal(2);
    game.changePlayerTurn();
    expect(game.activePlayer).to.equal(0);
  });

  it('should have two dailydoubles in round 2', function() {
    game.startGame();
    expect(game.doubleCount).to.have.length(1);
    game.changeRound2();
    expect(game.doubleCount).to.have.length(2);
  }); //Daily double not currently implemented

  it('should reset turn count when the round changes', function() {
    expect(game.round).to.equal(1);
    game.changeRound2();
    expect(game.round).to.equal(2);
  })
});