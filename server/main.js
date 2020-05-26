import { Meteor } from 'meteor/meteor';

PlayersList = new Mongo.Collection('players');


Meteor.publish('thePlayers', function(){
  return PlayersList.find()
});

Meteor.methods({
  'insertPlayer': function(playerName){
    PlayersList.insert({
        name: playerName,
        score: 0
    });
  },
  'removePlayer': function(selectedPlayer){
    PlayersList.remove({_id: selectedPlayer});
  },
  'modifyPlayerScore': function(selectedPlayer, scoreValue){
    PlayersList.update( {_id: selectedPlayer}, {$inc: {score: scoreValue} });
  }
});
