import chai from 'chai';
const expect = chai.expect;

import spies from 'chai-spies';
chai.use(spies);

import Player from '../src/player.js';
import domUpdates from '../src/domUpdates.js';

describe('Player', function() {
  var player;

  beforeEach(function() {
    player = new Player("Archie", 0);
    chai.spy.on(domUpdates, 'updatePlayerScore', returns => true);
  });

  afterEach(function() {
    chai.spy.restore(domUpdates);
  });

  it('should instantiate our good friend, player', function() {
    expect(player).to.be.an.instanceof(Player);
  });

  it('should have properties', function() {
    expect(player.name).to.equal("Archie");
    expect(player.score).to.equal(0);
  });

  it('should update their score', function() {
    expect(player.score).to.equal(0);
    player.updateScore('correct', 300, player, 0);
    expect(player.score).to.equal(300);
    player.updateScore('wrong', 200, player, 0);
    expect(player.score).to.equal(100);
  })

});