module.exports = function(game){
    var self = this;

    self._id = game._id;

    self.minPlayers = game.minPlayers;
    self.maxPlayers = game.maxPlayers;
    self.players = game.players;

    self.createdBy = game.createdBy;

    self.state = game.state;
};
