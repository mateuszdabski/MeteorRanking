import './main.html';

PlayersList = new Mongo.Collection('players');

Template.leaderboard.helpers({
  'player': function(){
      return PlayersList.find()
  }
});

