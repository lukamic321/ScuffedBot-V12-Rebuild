const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
	channelID: { type: String, require: true, unique: true },
	ownerID: { type: String, require: true },
});

const model = mongoose.model('ChannelSchema', channelSchema);

module.exports = model;