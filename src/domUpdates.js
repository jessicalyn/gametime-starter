import Gameboard from './gameboard.js';
import $ from 'jquery';

const domUpdates = {

  labelCategories([roundCategories]) {
    let $category0 = roundCategories[0]
    $('#category-0').text($category0);
    let $category1 = roundCategories[1]
    $('#category-1').text($category1);
    let $category2 = roundCategories[2]
    $('#category-2').text($category2);
    let $category3 = roundCategories[3]
    $('#category-3').text($category3);
  },

  removeCategories() {
    $('#category-0').text(" ");
    $('#category-1').text(" ");
    $('#category-2').text(" ");
    $('#category-3').text(" ");
  },

  removeStartScreen() {
    $('h4').addClass('add-margin-top');
    $('.input-fields').hide();
  },

  populateClueCard(selectedClue) {
    $('#playerAnswer').val('');
    $('.category-reminder').text(selectedClue.categoryName);
    $('#displayPointVal').text(`For $${selectedClue.pointValue}`);
    $('#displayQuestion').text(selectedClue.question);
    $('#rightWrong').hide();
    this.showClueCard();
  },

  showClueCard() {
    $('.answer-btn').show();
    $('.question-card').show();
  },

  correctFeedback() {
    $('.answer-btn').hide();
    $('#rightWrong').text('CORRECT!')
      .removeClass('incorrect-feedback')
      .addClass('correct-feedback')
      .show();
    $('.question-card').fadeOut(1000, function() {
      $(this).hide();
    })
  },

  incorrectFeedback() {
    $('.answer-btn').hide();
    $('#rightWrong').text('INCORRECT!')
      .removeClass('correct-feedback')
      .addClass('incorrect-feedback')
      .show();
    $('.question-card').fadeOut(1000, function() {
      $(this).hide();
    })
  },

  showWagerCard() {
    $('#dailyDoubleCard').show();
  },

  removeWagerCard() {
    $('#dailyDoubleCard').hide();
  },

  changePlayerNames(game) {
    $('#playerName1').text(game.playersArray[0].name);
    $('#playerName2').text(game.playersArray[1].name);
    $('#playerName3').text(game.playersArray[2].name);
  },

  disableClue(id) {
    let $recentClue = $(`#${id}`);
    $recentClue.removeClass('available-box');
    $recentClue.addClass('disabled');
  },

  disableAllClues() {
    $('.clue-box').removeClass('available-box');
    $('.clue-box').addClass('disabled');
  },

  repopulateClues() {
    let $allClueBoxes = $('.clue-box');
    $allClueBoxes.removeClass('disabled');
    $allClueBoxes.addClass('available-box');
  },

  activePlayerHighlight(activePlayerNum) {
    $(`#avatar${activePlayerNum}`).css("background-color", "lightgreen")
  },

  deactivatePlayerHighlight(activePlayerNum) {
    $(`#avatar${activePlayerNum}`).css("background-color", "#853c1e")
  },

  updatePlayerScore(activePlayer, score, activePlayerIndex) {
    let $playerScore = $(`#scoreBox${activePlayerIndex}`);
    $playerScore.text(`$${score}`);
  },

  setClueBoxPoints() {
    $('.100').text("$200");
    $('.200').text("$400");
    $('.300').text("$600");
    $('.400').text("$800");
  },

  reassignPointValue(wagerAmount) {
    $('#displayPointVal').text(`For $${wagerAmount}`);
  },

  roundTwoDisplay() {
    $('.round-two').show();
    $('.round-two').fadeOut(3000, function() {
      $(this).hide();
    })
  }  
}



export default domUpdates;

