import './main.html';

PlayersList = new Mongo.Collection('players');

Template.leaderboard.helpers({
  'player': function(){
      return PlayersList.find();
  },
  'selectedClass': function(){
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerId == selectedPlayer){
      return "selected"
    }
  }
});

Template.leaderboard.events({
  'click .player': function(){
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
  }   
});