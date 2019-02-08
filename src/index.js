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
  pullNames();
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

function pullNames() {
  let $playerName1 = $('#playerNameInput1').val();
  let $playerName2 = $('#playerNameInput2').val();
  let $playerName3 = $('#playerNameInput3').val();
  game.createPlayers(game, $playerName1, $playerName2, $playerName3);
}
