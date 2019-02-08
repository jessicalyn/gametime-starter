import './css/base.css';
import Clue from './clue.js';
import Dailydouble from './dailyDouble.js';
import data from './data.js';
import domUpdates from './domUpdates.js';
import Gameboard from './gameboard.js';
import Player from './player.js';
import $ from 'jquery';

let game = new Gameboard();

$('#playBtn').on('click', function(e) {
  e.preventDefault();
  game.startGame();
  createPlayers();
  domUpdates.removeStartScreen();
})

$('.no-submit').on('submit', function(e) {
  search($('no-reload'));
  e.preventDefault();
}, false);

$('body').on('click', function(e) {
  e.preventDefault;
  if (game.round === 3) {
    game.selectFinalJeopardy(e);
  } else {
    game.selectCorrectClue(e);
  }
})

$('#reset-button').on('click', function() {
    location.reload();
})

function createPlayers() {
  let $playerName1 = $('#playerNameInput1').val();
  let $playerName2 = $('#playerNameInput2').val();
  let $playerName3 = $('#playerNameInput3').val();
  let player1 = new Player($playerName1, 0, 0, 1, true);
  let player2 = new Player($playerName2, 0, 0, 2, false);
  let player3 = new Player($playerName3, 0, 0, 3, false);
  game.createPlayersArray(game, player1, player2, player3);
}
