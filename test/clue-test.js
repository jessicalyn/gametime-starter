import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import Clue from '../src/clue.js';
import domUpdates from '../src/domUpdates.js';
import Game from '../src/gameboard.js';

describe('Clue', function() {
  let clue;

  beforeEach(function() {
    chai.spy.on(domUpdates, ['populateClueCard', 'correctFeedback', 'incorrectFeedback'], () => true);
    clue = new Clue();
  });

  afterEach(function() {
    chai.spy.restore(domUpdates);
  });

  it('should instantiate a clue', function() {
    expect(clue).to.be.an.instanceof(Clue);
  });

  it('should have default properties', function() {
    clue = new Clue("monopoly", 5, "Board Games", 100, "Do not pass go");
    expect(clue.answer).to.equal("monopoly");
    expect(clue.categoryId).to.equal(5);
    expect(clue.categoryName).to.equal("Board Games");
    expect(clue.pointValue).to.equal(100);
    expect(clue.question).to.equal("Do not pass go");
  })

  it('should check the players answer', function() {
    let game = new Game();
    clue.checkAnswer(game, {
      question: "One of Post's Pebbles Cereals is named for this pet who lives in Bedrock", 
      pointValue: 300, 
      answer: "Dino", 
      categoryId: 9, 
      categoryName: "FOOD"},
       "dino");
    expect(answer).to.equal("correct");
    game.playerScore("correct", 300);
  });

});

