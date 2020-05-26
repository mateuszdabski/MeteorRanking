import './main.html';

PlayersList = new Mongo.Collection('players');

Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
  'player': function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1} });
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
  },
  'click .increment': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, 1);
  },
  'click .decrement': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, -1);
  },
  'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('removePlayer', selectedPlayer);
  }
});

Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault();
    var playerName = event.target.playerName.value;
    Meteor.call('insertPlayer', playerName);
  }
});