module.exports = function () {
	return {
		connect: connect,
		match: match
	};

	var socket;
	function connect(gameId) {
		if (io) {
			socket = io.connect('http://mahjongmayhem.herokuapp.com?gameId=' + gameId);
		}
	}

	function match(callback){
		socket.on("match", function(data){
			if(callback) callback(data);
		});
	}
};