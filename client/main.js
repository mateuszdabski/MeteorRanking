import './main.html';

PlayersList = new Mongo.Collection('players');

Meteor.subscribe('thePlayers');
Session.set('sortAscending', -1);

Template.leaderboard.helpers({
  'player': function(){
      return PlayersList.find({}, {sort: {score: Session.get('sortAscending'), name: 1} });
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
  },
  'click .sort': function(){
    var sortAscending = Session.get('sortAscending');
    var sortButton = document.getElementById("sortButton");
    if (sortAscending == 1){
      sortButton.value = "Sort from the lowest";
    } else {
      sortButton.value = "Sort from the highest";
    }
    Session.set('sortAscending', sortAscending * -1);
  }
});

Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault();
    var playerName = event.target.playerName.value;
    Meteor.call('insertPlayer', playerName);
    document.getElementById("addPlayerForm1").reset();
  }
});