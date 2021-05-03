const mongoose = require('mongoose');

const privateSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	channelID: String,
	ownerID: String,
});

module.exports = mongoose.model('Private', privateSchema, 'Private Channels');